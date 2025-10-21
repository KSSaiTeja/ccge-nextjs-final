import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "courseName",
      "amount",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
    if (!sheetId) {
      throw new Error("Google Sheets ID not configured");
    }

    const sheets = getGoogleSheetsClient();

    // Generate unique enrollment ID
    const enrollmentId = `ENR${Date.now()}${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // Prepare row data - simplified structure
    const rowData = [
      timestamp, // A: Timestamp
      enrollmentId, // B: Enrollment ID
      body.fullName, // C: Full Name
      body.email, // D: Email
      body.phone, // E: Phone
      body.whatsappSame ? "Yes" : "No", // F: Whatsapp Available
      body.gender || "Not Specified", // G: Gender
      body.city, // H: City
      body.state, // I: State
      body.pincode, // J: Pincode
      body.courseName, // K: Course Name
      body.courseId, // L: Course ID
      body.paymentPlan, // M: Payment Plan
      `₹${body.amount.toLocaleString("en-IN")}`, // N: Amount Paid
      `₹${body.totalAmount.toLocaleString("en-IN")}`, // O: Total Course Fee
      "Pending Payment", // P: Payment Status
      "", // Q: Razorpay Payment ID
      "", // R: Payment Date
      "", // S: Payment Method
      body.acceptTerms ? "Yes" : "No", // T: Terms Accepted
      "", // U: LMS Granted
      "", // V: Notes
    ];

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:V", // Updated to match new column structure
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({
      success: true,
      enrollmentId,
      message: "Enrollment details saved successfully",
    });
  } catch (error) {
    console.error("Enrollment creation error:", error);

    // Check if it's a Google Sheets API error
    if (error instanceof Error) {
      if (error.message.includes("credentials")) {
        return NextResponse.json(
          {
            error:
              "Google Sheets not configured. Please contact administrator.",
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to save enrollment details. Please try again." },
      { status: 500 },
    );
  }
}
