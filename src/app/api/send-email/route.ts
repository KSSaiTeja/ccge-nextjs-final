import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailData, generatePaymentSuccessEmail, generatePaymentFailedEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data: EmailData = await request.json();

    // Validate email address
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!data.type) {
      return NextResponse.json(
        { error: "Email type is required" },
        { status: 400 }
      );
    }

    const subject = data.type === "success" 
      ? `🎉 Payment Successful - Welcome to ${data.courseName}!`
      : `⚠️ Payment Failed - Action Required for ${data.courseName}`;

    const html = data.type === "success" 
      ? generatePaymentSuccessEmail(data)
      : generatePaymentFailedEmail(data);

    // Send email via Resend
    const result = await resend.emails.send({
      from: "CCGE <info@ccge.in>",
      to: data.email,
      subject: subject,
      html: html,
    });

    const emailId = result.data?.id || "unknown";
    
    console.log("Email sent successfully:", {
      emailId: emailId,
      recipient: data.email,
      type: data.type,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      messageId: emailId,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Email sending error:", error);
    
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
