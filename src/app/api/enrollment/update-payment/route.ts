import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import crypto from "crypto";

// Initialize Google Sheets API
const getGoogleSheetsClient = () => {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );

  if (!clientEmail || !privateKey) {
    throw new Error("Google Sheets credentials not configured");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

// Verify Razorpay payment signature
const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string,
): boolean => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error("Razorpay key secret not configured");
  }

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
};

/**
 * Idempotent Payment Status Update API
 * Prevents duplicate updates and handles retry scenarios
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      enrollmentId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    // Validate required fields
    if (!enrollmentId || !razorpayPaymentId) {
      return NextResponse.json(
        { error: "Missing required payment details" },
        { status: 400 },
      );
    }

    // If payment ID is "FAILED", skip signature verification
    if (razorpayPaymentId !== "FAILED" && razorpayOrderId && razorpaySignature) {
      const isValid = verifyPaymentSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      );
      if (!isValid) {
        console.error("Signature verification failed for enrollment:", enrollmentId);
        return NextResponse.json(
          { error: "Invalid payment signature" },
          { status: 400 },
        );
      }
    }

    const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
    if (!sheetId) {
      throw new Error("Google Sheets ID not configured");
    }

    const sheets = getGoogleSheetsClient();

    // Get all enrollment data to find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A:V", // Updated to match new column structure
    });

    const rows = response.data.values || [];
    let rowIndex = -1;

    // Find the row with matching enrollment ID (column B, index 1)
    for (let i = 1; i < rows.length; i++) {
      // Start from 1 to skip header
      if (rows[i][1] === enrollmentId) {
        rowIndex = i + 1; // +1 because sheets are 1-indexed
        break;
      }
    }

    if (rowIndex === -1) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 },
      );
    }

    // Extract student information from the row with proper validation
    const studentData = rows[rowIndex - 1];
    const studentName = studentData[2]?.trim() || "Student"; // Column C: Full Name
    const studentEmail = studentData[3]?.trim() || ""; // Column D: Email
    const courseName = studentData[10]?.trim() || "Course"; // Column K: Course Name
    const amountPaid = studentData[13]?.trim() || "₹0"; // Column N: Amount Paid

    // Validate critical fields
    if (!studentEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
      console.error("Invalid email address in enrollment:", {
        enrollmentId,
        email: studentEmail,
      });
    }

    // IDEMPOTENCY CHECK: Check current payment status
    const currentStatus = rows[rowIndex - 1][15]; // Column P (0-indexed: 15)
    const currentPaymentId = rows[rowIndex - 1][16]; // Column Q (0-indexed: 16)

    // If payment is already successful with the same payment ID, skip update
    if (currentStatus === "✅ Paid" && currentPaymentId === razorpayPaymentId) {
      console.log("Payment already recorded - skipping duplicate update:", {
        enrollmentId,
        paymentId: razorpayPaymentId,
      });
      return NextResponse.json({
        success: true,
        message: "Payment already recorded",
        alreadyProcessed: true,
      });
    }

    // Prevent downgrading from successful to failed
    if (currentStatus === "✅ Paid" && razorpayPaymentId === "FAILED") {
      console.warn("Attempted to downgrade successful payment to failed:", {
        enrollmentId,
        currentPaymentId,
      });
      return NextResponse.json({
        success: true,
        message: "Payment already successful - cannot change to failed",
        alreadyProcessed: true,
      });
    }

    const paymentDate = new Date().toISOString();

    // Determine if payment was successful or failed
    const isPaymentSuccessful = razorpayPaymentId !== "FAILED";
    const paymentStatus = isPaymentSuccessful ? "✅ Paid" : "❌ Payment Failed";
    const paymentMethod = isPaymentSuccessful ? "Razorpay" : "Failed";

    // Update payment status columns (P, Q, R, S)
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Sheet1!P${rowIndex}:S${rowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            paymentStatus, // P: Payment Status (✅ Paid or ❌ Payment Failed)
            razorpayPaymentId, // Q: Razorpay Payment ID (or "FAILED")
            paymentDate, // R: Payment Date
            paymentMethod, // S: Payment Method (Razorpay or Failed)
          ],
        ],
      },
    });

    console.log("Payment status updated successfully:", {
      enrollmentId,
      status: paymentStatus,
      paymentId: razorpayPaymentId,
      timestamp: paymentDate,
    });

    // Send email notification (non-blocking with proper error handling)
    if (studentEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
      // Send email in background without blocking the response
      setImmediate(async () => {
        try {
          const { Resend } = await import("resend");
          const resend = new Resend(process.env.RESEND_API_KEY);

          const emailData = {
            studentName,
            email: studentEmail,
            courseName,
            amount: amountPaid,
            paymentId: isPaymentSuccessful ? razorpayPaymentId : undefined,
            enrollmentId,
            paymentDate,
            paymentMethod,
            failureReason: !isPaymentSuccessful ? "Payment was declined or failed" : undefined,
            batchStartDate: "November 3rd, 2025",
            type: isPaymentSuccessful ? ("success" as const) : ("failure" as const),
          };

          console.log("Sending email notification:", {
            enrollmentId,
            email: studentEmail,
            type: emailData.type,
          });

          const subject = emailData.type === "success" 
            ? `🎉 Payment Successful - Welcome to ${emailData.courseName}!`
            : `⚠️ Payment Failed - Action Required for ${emailData.courseName}`;

          // Generate HTML email (you can import this function)
          const { generatePaymentSuccessEmail, generatePaymentFailedEmail } = await import("../../send-email/route");
          const html = emailData.type === "success" 
            ? generatePaymentSuccessEmail(emailData)
            : generatePaymentFailedEmail(emailData);

                     const result = await resend.emails.send({
             from: "CCGE <info@ccge.in>",
             to: studentEmail,
             subject: subject,
             html: html,
           });

           const emailId = result.data?.id || "unknown";

           console.log("Email sent successfully:", {
             enrollmentId,
             emailId: emailId,
             recipient: studentEmail,
           });

        } catch (emailError) {
          console.error("Error sending email (non-critical):", {
            enrollmentId,
            error: emailError instanceof Error ? emailError.message : String(emailError),
          });
        }
      });
    } else {
      console.warn("Skipping email notification - invalid email address:", {
        enrollmentId,
        email: studentEmail,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment status updated successfully",
    });
  } catch (error) {
    console.error("Payment update error:", error);

    return NextResponse.json(
      { error: "Failed to update payment status" },
      { status: 500 },
    );
  }
}
