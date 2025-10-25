# 📧 Email Integration Guide - Resend + Payment Notifications

## 🎯 Overview

This guide explains the email notification system integrated with your payment flow. When students complete or fail payments, they automatically receive professional HTML emails with all relevant details.

---

## ✨ What's Implemented

### 1. **Email Types**

#### ✅ Success Email (Payment Successful)
- Sent when payment is successfully captured
- Includes:
  - Course enrollment confirmation
  - Payment invoice with all details
  - Next steps for course access
  - Support contact information

#### ⚠️ Failure Email (Payment Failed)
- Sent when payment fails or is declined
- Includes:
  - Payment failure details
  - Reason for failure
  - Steps to retry payment
  - Support contact information

### 2. **Email Features**

- ✅ Professional HTML design
- ✅ Branded with CCGE logo
- ✅ Responsive for mobile devices
- ✅ Real student data (no hardcoded values)
- ✅ Course-specific information
- ✅ Payment details and IDs
- ✅ Next steps and support info

---

## 🔧 Setup Instructions

### Step 1: Get Resend API Key

1. Go to https://resend.com/
2. Sign up or login
3. Navigate to **API Keys** section
4. Click **"Create API Key"**
5. Copy the API key (starts with `re_`)

### Step 2: Verify Your Domain

1. In Resend dashboard, go to **Domains**
2. Add domain: `ccge.in`
3. Follow DNS setup instructions to verify ownership
4. Wait for verification (usually instant)

### Step 3: Add Environment Variable

Add to your `.env.local` file:

```bash
RESEND_API_KEY=re_YOUR_API_KEY_HERE
```

### Step 4: Restart Server

```bash
npm run dev
```

---

## 📊 How It Works

### Payment Success Flow

```
Student Pays → Razorpay Success → Google Sheet Updated → Email Sent Automatically
```

1. Student completes payment
2. Razorpay sends payment confirmation
3. System updates Google Sheet (✅ Paid)
4. **Email API automatically triggered**
5. Student receives success email

### Payment Failure Flow

```
Student Payment Fails → Razorpay Failure → Google Sheet Updated → Email Sent Automatically
```

1. Payment fails/declined
2. Razorpay sends failure notification
3. System updates Google Sheet (❌ Payment Failed)
4. **Email API automatically triggered**
5. Student receives failure email with retry instructions

---

## 🎨 Email Data Flow

The system extracts real data from Google Sheets:

| Email Field | Google Sheet Column |
|-------------|---------------------|
| Student Name | Column C (Full Name) |
| Email Address | Column D (Email) |
| Course Name | Column K (Course Name) |
| Amount Paid | Column N (Amount Paid) |
| Payment ID | Column Q (Razorpay Payment ID) |
| Enrollment ID | Column B (Enrollment ID) |

**All data is real and dynamic - no hardcoded values!**

---

## 🧪 Testing

### Test Success Email

1. Make a test payment
2. Use test card: `4111 1111 1111 1111`
3. Check student's email inbox
4. Verify all details are correct

### Test Failure Email

1. Use failed test card: `4000 0000 0000 0002`
2. Payment will be declined
3. Check student's email inbox
4. Verify failure message and retry steps

---

## 📝 Email Templates

### Success Email Includes:

- ✅ Welcome message
- 📚 Course enrollment confirmation
- 💰 Payment invoice
- 🎓 Enrollment ID and status
- 📅 Batch start information
- 🚀 What happens next (LMS access, etc.)
- 📞 Support contact details

### Failure Email Includes:

- ⚠️ Payment failure notice
- 💳 Payment details
- ❌ Failure reason
- 🔄 Retry instructions
- 📞 Support contact details

---

## 🔒 Security & Privacy

- ✅ Email addresses validated before sending
- ✅ All data extracted securely from Google Sheets
- ✅ Non-blocking email sending (doesn't affect payment flow)
- ✅ Error handling (payment succeeds even if email fails)
- ✅ No sensitive data in email logs

---

## 🐛 Troubleshooting

### Emails Not Sending?

1. **Check API Key**: Verify `RESEND_API_KEY` in `.env.local`
2. **Verify Domain**: Make sure `ccge.in` is verified in Resend
3. **Check Logs**: Look for email errors in server console
4. **Test API**: Use Resend dashboard to test email sending

### Test Commands

```bash
# Check if Resend is configured
echo $RESEND_API_KEY

# Check server logs for email errors
# Look for "Email sent successfully" or "Error sending email"
```

---

## 📈 Monitoring

### Email Delivery Status

- Check Resend dashboard for delivery reports
- View logs in `/api/send-email/route.ts`
- Monitor server console for email success/failure

### Console Logs

Look for these messages:
```
✅ "Email sent successfully: { emailId, recipient, type }"
❌ "Error sending email (non-critical): { error }"
```

---

## 🎯 Key Features

### 1. **Automatic Triggering**
- Emails sent automatically after payment status updates
- No manual intervention required

### 2. **Dynamic Content**
- All data pulled from actual enrollment records
- No hardcoded student or course information

### 3. **Error Resilience**
- Payment flow continues even if email fails
- Email sending is non-blocking

### 4. **Professional Design**
- Branded HTML templates
- Mobile-responsive
- Follows CCGE brand guidelines

### 5. **Complete Information**
- Payment IDs
- Enrollment IDs
- Course details
- Support contacts
- Next steps

---

## 📚 API Endpoint

### POST `/api/send-email`

**Request Body:**
```json
{
  "studentName": "John Doe",
  "email": "john@example.com",
  "courseName": "US (EA) Taxation & Accounting",
  "amount": "₹45,000",
  "paymentId": "pay_1234567890",
  "enrollmentId": "ENR1706123456789ABC",
  "paymentDate": "2024-10-27",
  "paymentMethod": "Credit Card",
  "failureReason": "Insufficient funds",
  "batchStartDate": "November 3rd, 2025",
  "type": "success" // or "failure"
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "email_id_from_resend",
  "message": "Email sent successfully"
}
```

---

## 🔄 Next Steps

1. ✅ Set up Resend account
2. ✅ Verify domain (ccge.in)
3. ✅ Add API key to `.env.local`
4. ✅ Test with a real payment
5. ✅ Monitor email delivery
6. ✅ Customize email content if needed

---

## 📞 Support

If you need help:
- Resend Documentation: https://resend.com/docs
- Check server logs for errors
- Verify domain verification status
- Test API key in Resend dashboard

---

## ✨ Summary

- ✅ Emails sent automatically for payment success/failure
- ✅ Professional HTML templates with real data
- ✅ Non-blocking (doesn't affect payment flow)
- ✅ Error resilient
- ✅ Fully branded and responsive
- ✅ Complete payment and course information

**Your students now receive automatic email notifications for every payment status change!** 🎉
