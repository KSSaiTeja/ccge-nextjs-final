import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  studentName: string;
  email: string;
  courseName: string;
  amount: string;
  paymentId?: string;
  enrollmentId?: string;
  paymentDate?: string;
  paymentMethod?: string;
  failureReason?: string;
  batchStartDate?: string;
  type: "success" | "failure";
}

export function generatePaymentSuccessEmail(data: EmailData): string {
  const { studentName, courseName, amount, paymentId, enrollmentId, paymentDate, paymentMethod, batchStartDate } = data;
  
  const currentDate = paymentDate || new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #c6e3ff 0%, #4faaff 100%); padding: 30px 40px; text-align: center;">
      <img src="https://www.ccge.in/assets/img/logo/CCGE%20Final%20Logo.png" alt="CCGE Logo" width="200" height="60" style="height: auto; max-width: 200px; margin-bottom: 20px;">
      <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 10px 0;">Payment Successful!</h1>
      <p style="color: #e6f0f8; font-size: 16px; margin: 0;">Welcome to CCGE - Your global career journey begins now!</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px;">
      <h2 style="color: #2b2b2b; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">Congratulations, ${studentName}! 🎉</h2>
      <p style="color: #575757; font-size: 16px; margin: 0 0 30px 0; line-height: 1.6;">
        Your payment has been successfully processed and you are now enrolled in the <strong>${courseName}</strong> program.
      </p>

      <!-- Enrollment Card -->
      <div style="border: 2px solid #e6f0f8; border-radius: 12px; padding: 25px; margin-bottom: 30px; background-color: #f8fafc;">
        <h3 style="color: #2f76b7; font-size: 18px; font-weight: 700; margin: 0 0 20px 0;">🎓 Enrollment Confirmation</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8;"><strong>Course:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8; text-align: right;">${courseName}</td>
          </tr>
          ${enrollmentId ? `
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8;"><strong>Enrollment ID:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8; text-align: right;">${enrollmentId}</td>
          </tr>
          ` : ''}
          ${batchStartDate ? `
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8;"><strong>Batch Start:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8; text-align: right;">${batchStartDate}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0;"><strong>Status:</strong></td>
            <td style="color: #22c55e; font-size: 14px; font-weight: 600; padding: 8px 0; text-align: right;">✅ Confirmed</td>
          </tr>
        </table>
      </div>

      <!-- Payment Invoice -->
      <div style="border: 2px solid #e6f0f8; border-radius: 12px; padding: 25px; margin-bottom: 30px; background-color: #ffffff;">
        <h3 style="color: #2f76b7; font-size: 18px; font-weight: 700; margin: 0 0 20px 0;">🧾 Payment Invoice</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          ${paymentId ? `
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8;"><strong>Payment ID:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8; text-align: right;">${paymentId}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8;"><strong>Amount Paid:</strong></td>
            <td style="color: #2b2b2b; font-size: 16px; font-weight: 700; padding: 8px 0; border-bottom: 1px solid #e6f0f8; text-align: right;">${amount}</td>
          </tr>
          ${paymentMethod ? `
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8;"><strong>Method:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e6f0f8; text-align: right;">${paymentMethod}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0;"><strong>Date:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; text-align: right;">${currentDate}</td>
          </tr>
        </table>
      </div>

      <!-- Next Steps -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #2f76b7; font-size: 18px; font-weight: 700; margin: 0 0 15px 0;">🚀 What Happens Next?</h3>
        <div style="background-color: #f0f8ff; border: 1px solid #2f76b7; border-radius: 8px; padding: 20px;">
          <ul style="color: #575757; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.6;">
            <li style="margin-bottom: 8px;"><strong>Within 24 hours:</strong> You'll receive LMS access credentials via email</li>
            <li style="margin-bottom: 8px;"><strong>Before batch starts:</strong> Join our WhatsApp group for updates</li>
            <li style="margin-bottom: 8px;"><strong>Course materials:</strong> Download study materials from LMS</li>
            <li><strong>Live sessions:</strong> Attend interactive sessions as per schedule</li>
          </ul>
        </div>
      </div>

      <!-- Support -->
      <div style="border: 1px solid #e6f0f8; border-radius: 8px; padding: 20px; background-color: #f8fafc;">
        <h4 style="color: #2f76b7; font-size: 16px; font-weight: 600; margin: 0 0 15px 0;">💬 Need Support?</h4>
        <p style="color: #575757; font-size: 14px; margin: 0 0 10px 0; line-height: 1.5;">Our support team is here to help:</p>
        <div style="color: #575757; font-size: 14px; line-height: 1.6;">
          📞 <strong>Phone:</strong> +91 96666 60713 | +91 96666 60714<br/>
          📧 <strong>Email:</strong> info@ccge.in<br/>
          💬 <strong>WhatsApp:</strong> +91 96666 60713
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 30px 40px; background-color: #f8fafc; text-align: center;">
      <div style="color: #2b2b2b; font-size: 18px; font-weight: 700; margin-bottom: 15px;">Corporate Commerce Global Education</div>
      <div style="color: #575757; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
        <div>📍 Corporate Commerce Bhavan, Opp. Madhura Nagar Metro Station</div>
        <div>Ameerpet, Hyderabad - 500016</div>
        <div style="margin-top: 10px;">🌐 www.ccge.in | 📧 info@ccge.in</div>
      </div>
      <div style="border-top: 1px solid #e6f0f8; padding-top: 20px; color: #575757; font-size: 12px;">
        <p style="margin: 0;">This is your official enrollment confirmation and payment receipt.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export function generatePaymentFailedEmail(data: EmailData): string {
  const { studentName, courseName, amount, paymentId, failureReason } = data;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ffcccc 0%, #fd6e6e 100%); padding: 30px 40px; text-align: center;">
      <img src="https://www.ccge.in/assets/img/logo/CCGE%20Final%20Logo.png" alt="CCGE Logo" width="200" height="60" style="height: auto; max-width: 200px; margin-bottom: 20px; filter: brightness(0) invert(1);">
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 10px 0;">⚠️ Payment Failed - Action Required</h1>
      <p style="color: #ffe5e6; font-size: 16px; margin: 0;">Don't worry, we're here to help you complete your enrollment</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px;">
      <h2 style="color: #2b2b2b; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">Dear ${studentName},</h2>
      <p style="color: #575757; font-size: 16px; margin: 0 0 30px 0; line-height: 1.6;">
        We encountered an issue processing your payment for the <strong>${courseName}</strong> course. Don't worry - your enrollment is still reserved!
      </p>

      <!-- Payment Details -->
      <div style="border: 2px solid #ffe5e6; border-radius: 12px; padding: 25px; margin-bottom: 30px; background-color: #fff5f5;">
        <h3 style="color: #e61e24; font-size: 18px; font-weight: 700; margin: 0 0 20px 0; text-align: center;">📋 Payment Details</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #ffe5e6;"><strong>Course:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #ffe5e6; text-align: right;">${courseName}</td>
          </tr>
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #ffe5e6;"><strong>Amount:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #ffe5e6; text-align: right;">${amount}</td>
          </tr>
          ${paymentId ? `
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #ffe5e6;"><strong>Payment ID:</strong></td>
            <td style="color: #2b2b2b; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #ffe5e6; text-align: right;">${paymentId}</td>
          </tr>
          ` : ''}
          ${failureReason ? `
          <tr>
            <td style="color: #575757; font-size: 14px; padding: 8px 0;"><strong>Reason:</strong></td>
            <td style="color: #e61e24; font-size: 14px; font-weight: 600; padding: 8px 0; text-align: right;">${failureReason}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <!-- Next Steps -->
      <div style="background-color: #f0f8ff; border-radius: 12px; padding: 25px; margin-bottom: 30px; border: 1px solid #2f76b7;">
        <h3 style="color: #2f76b7; font-size: 18px; font-weight: 700; margin: 0 0 15px 0; text-align: center;">🚀 Next Steps to Complete Your Enrollment</h3>
        <div style="margin-bottom: 20px;">
          <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
            <div style="background-color: #2f76b7; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">1</div>
            <div>
              <h4 style="color: #2b2b2b; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">Check Your Payment Method</h4>
              <p style="color: #575757; font-size: 14px; margin: 0;">Ensure sufficient funds or try a different payment method</p>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
            <div style="background-color: #2f76b7; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">2</div>
            <div>
              <h4 style="color: #2b2b2b; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">Retry Payment</h4>
              <p style="color: #575757; font-size: 14px; margin: 0;">Visit the course page to retry your payment securely</p>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start;">
            <div style="background-color: #2f76b7; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">3</div>
            <div>
              <h4 style="color: #2b2b2b; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">Contact Support</h4>
              <p style="color: #575757; font-size: 14px; margin: 0;">Our support team is available 24/7 to assist you</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Support -->
      <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; text-align: center;">
        <h3 style="color: #2f76b7; font-size: 16px; font-weight: 700; margin: 0 0 15px 0;">📞 Need Immediate Assistance?</h3>
        <p style="color: #575757; font-size: 14px; margin: 0 0 15px 0;">Our support team is here to help you complete your enrollment:</p>
        <div style="color: #2f76b7; font-size: 14px; font-weight: 600;">
          📞 +91 96666 60713 | +91 96666 60714<br/>
          📧 info@ccge.in | 💬 WhatsApp Support
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 30px 40px; background-color: #f8fafc; text-align: center;">
      <div style="color: #2b2b2b; font-size: 18px; font-weight: 700; margin-bottom: 15px;">Corporate Commerce Global Education</div>
      <div style="color: #575757; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
        <div>📍 Corporate Commerce Bhavan, Opp. Madhura Nagar Metro Station</div>
        <div>Ameerpet, Hyderabad - 500016</div>
        <div style="margin-top: 10px;">🌐 www.ccge.in | 📧 info@ccge.in</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

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
      from: "CCGE <info@ccge.in>", // Update with your Resend verified domain
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
