# 📊 Google Sheets Integration - Complete Setup Guide

## 🎯 What This Does

**Complete Payment Enrollment Flow:**
1. Student clicks "Buy Now" → Payment enrollment form appears
2. Student fills detailed information → Saved to Google Sheets as "Pending Payment"
3. Razorpay opens automatically → Student completes payment
4. Payment status auto-updates to "✅ Paid" in Google Sheets
5. Your team views all enrollments in organized Google Sheet

---

## 🔧 Step-by-Step Setup

### **Step 1: Create Google Sheet**

1. Go to [Google Sheets](https://sheets.google.com/)
2. Click **"+ Blank"** to create new sheet
3. Rename it to: **"CCGE Enrollments"**
4. **Create header row** (Row 1) with these exact column names:

```
A: Timestamp
B: Enrollment ID
C: Full Name
D: Email
E: Phone
F: WhatsApp Available
G: Date of Birth
H: Gender
I: Address
J: City
K: State
L: Pincode
M: Country
N: Qualification
O: Field of Study
P: College/University
Q: Year of Completion
R: Occupation
S: Company Name
T: Years of Experience
U: Course Name
V: Course ID
W: Payment Plan
X: Amount Paid
Y: Total Course Fee
Z: Preferred Start Date
AA: Payment Status
AB: Razorpay Payment ID
AC: Payment Date
AD: Payment Method
AE: Terms Accepted
AF: LMS Access Granted
AG: Notes
```

5. **Format the sheet** (optional but recommended):
   - Make Row 1 bold
   - Freeze Row 1 (View → Freeze → 1 row)
   - Add filter (Data → Create a filter)
   - Color code columns:
     - Personal Info (C-H): Light Blue
     - Contact (I-M): Light Green
     - Education (N-Q): Light Yellow
     - Professional (R-T): Light Orange
     - Course & Payment (U-AD): Light Purple
     - Admin (AE-AG): Light Gray

6. **Note the Sheet ID** from URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit
   ```
   Copy the `SHEET_ID` part

---

### **Step 2: Enable Google Sheets API**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)

2. **Create Project** (or use existing):
   - Click project dropdown → "New Project"
   - Name: "CCGE Enrollments"
   - Click "Create"

3. **Enable Google Sheets API**:
   - In search bar, type "Google Sheets API"
   - Click on it
   - Click "Enable"

4. **Create Service Account**:
   - Go to "Credentials" (left sidebar)
   - Click "+ CREATE CREDENTIALS" → "Service Account"
   - Service account name: `ccge-enrollment-service`
   - Service account ID: (auto-generated)
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

5. **Create & Download Key**:
   - Click on the service account you just created
   - Go to "KEYS" tab
   - Click "ADD KEY" → "Create new key"
   - Choose "JSON"
   - Click "Create"
   - **JSON file downloads automatically** - SAVE THIS SECURELY!

6. **Get Service Account Email**:
   - Open the downloaded JSON file
   - Look for `"client_email": "...@....iam.gserviceaccount.com"`
   - Copy this email address

---

### **Step 3: Share Sheet with Service Account**

1. Open your "CCGE Enrollments" Google Sheet
2. Click "Share" button (top-right)
3. Paste the service account email
4. Give "Editor" permission
5. **Uncheck** "Notify people"
6. Click "Share"

---

### **Step 4: Configure Environment Variables**

1. Open the JSON credentials file you downloaded
2. Find these values:
   - `client_email`: The service account email
   - `private_key`: A long text starting with `"-----BEGIN PRIVATE KEY-----\n"`

3. Create/update `.env.local` file in your project root:

```env
# Razorpay (you already have these)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_SECRET

# Google Sheets Integration (NEW - Add these)
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project-name.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SHEET_ID=your-sheet-id-from-url
```

**Important Notes:**
- Keep the private key in quotes
- The `\n` characters should stay as-is
- Never commit `.env.local` to git (it's already in .gitignore)

---

### **Step 5: Test the Integration**

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Test enrollment flow:**
   - Go to EA Course or UK Taxation course page
   - Select payment option
   - Click "Buy Now"
   - Fill the enrollment form
   - Click "Submit & Proceed to Payment"
   - Check Google Sheet → New row should appear with "Pending Payment"
   - Complete Razorpay test payment
   - Check Google Sheet → Status should update to "✅ Paid"

3. **Test with Razorpay Test Card:**
   ```
   Card Number: 4111 1111 1111 1111
   CVV: 123
   Expiry: 12/25
   Name: Test User
   ```

---

## 📋 Student Information Fields Collected

### **Personal Information:**
- Full Name (as per ID) *
- Email Address *
- Phone Number *
- Date of Birth *
- Gender
- WhatsApp availability

### **Contact Details:**
- Full Address *
- City *
- State *
- Pincode *
- Country * (default: India)

### **Educational Background:**
- Highest Qualification * (dropdown)
- Field of Study *
- College/University Name *
- Year of Completion *

### **Professional Information:**
- Current Occupation * (Student/Working/Self-Employed/etc.)
- Company Name (if applicable)
- Years of Experience

### **Course Specific:**
- Course Name (auto-filled)
- Payment Plan Selected (auto-filled)
- Amount (auto-filled)
- Preferred Start Date *

### **Terms:**
- Accept Terms & Conditions *

**\* = Required fields**

---

## 🔐 Security Features Implemented

### **1. Payment Signature Verification**
- Every payment is verified using Razorpay signature
- Prevents tampering with payment amount
- Ensures payment authenticity

### **2. Server-Side Processing**
- All Google Sheets operations happen on backend
- Credentials never exposed to frontend
- API routes protected

### **3. Unique Enrollment IDs**
- Format: `ENR{timestamp}{random}`
- Example: `ENR1706123456789ABC123XYZ`
- Prevents duplicates
- Easy tracking

### **4. Input Validation**
- Email format validation
- Phone number validation (10 digits)
- Required field checks
- XSS protection

### **5. Error Handling**
- Graceful error messages
- Fallback mechanisms
- No sensitive data in errors

---

## 📊 Google Sheet Structure & Usage

### **Payment Status Values:**
- `Pending Payment` - Form submitted, waiting for payment
- `✅ Paid` - Payment successful
- `❌ Payment Failed` - Payment failed
- `Partial Payment (1/2)` - First installment paid (you manually add this)
- `Fully Paid (2/2)` - All installments paid (you manually add this)

### **Useful Google Sheets Features:**

**1. Filter by Status:**
   - Click filter icon
   - Column AA (Payment Status) → Select specific status

**2. Sort by Date:**
   - Click column A header
   - Data → Sort range → Sort by "Timestamp"

**3. Search Student:**
   - Ctrl+F (Cmd+F on Mac)
   - Search by name, email, or enrollment ID

**4. Export Data:**
   - File → Download → Excel (.xlsx) or CSV

**5. Create Views:**
   - Data → Filter views → Create new filter view
   - Save custom filters (e.g., "Paid EA Students", "Pending Payments")

---

## 🎯 Daily Workflow for Your Team

### **Morning Check (Once per day):**

1. Open Google Sheet
2. Filter by "Pending Payment" status
3. Check if any payments are stuck → Follow up if needed
4. Filter by "✅ Paid" status from previous day
5. Grant LMS access manually
6. Update "LMS Access Granted" column to "Yes"
7. Add any notes in "Notes" column

### **For Installment Payments:**

**When 1st installment paid:**
1. Find the row
2. Update "Payment Status" to "Partial Payment (1/2)"
3. Add reminder date in "Notes": "2nd payment due: [date]"

**When 2nd installment paid:**
1. Student pays via Razorpay link you send
2. You manually check payment in Razorpay dashboard
3. Update "Payment Status" to "Fully Paid (2/2)"
4. Update "Razorpay Payment ID" with 2nd payment ID
5. Grant full course access

---

## ⚠️ Troubleshooting

### **Error: "Google Sheets credentials not configured"**

**Fix:**
1. Check `.env.local` file exists in project root
2. Verify all 3 variables are set:
   - `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `GOOGLE_SHEETS_PRIVATE_KEY`
   - `GOOGLE_SHEETS_SHEET_ID`
3. Restart dev server: `npm run dev`

---

### **Error: "Permission denied"**

**Fix:**
1. Make sure you shared the Google Sheet with service account email
2. Service account should have "Editor" permission
3. Check service account email in `.env.local` matches the one you shared sheet with

---

### **Error: "Sheet not found"**

**Fix:**
1. Verify `GOOGLE_SHEETS_SHEET_ID` is correct
2. Check sheet ID from URL (the part between `/d/` and `/edit`)
3. Make sure sheet is not deleted

---

### **Data not appearing in sheet**

**Fix:**
1. Open browser console (F12)
2. Check for errors
3. Verify API route is working: Check Network tab
4. Make sure sheet name is "Sheet1" (or update API code if different)

---

### **Payment status not updating**

**Fix:**
1. Check Razorpay test mode is active
2. Verify payment actually succeeded
3. Check browser console for errors
4. Manually verify in Razorpay dashboard

---

## 📞 Support & Next Steps

### **After Setup is Complete:**

✅ Test with 2-3 dummy enrollments
✅ Verify all data appears correctly
✅ Test payment success flow
✅ Test payment failure flow
✅ Train your team on how to use the sheet
✅ Create backup of sheet regularly (File → Make a copy)

### **When Going to Production:**

1. Switch Razorpay to LIVE mode (update `.env.local`)
2. Test with ₹1 real payment first
3. Monitor first 10 enrollments closely
4. Set up daily reminder to check pending payments

---

## 🚀 You're All Set!

Your enrollment system is now:
- ✅ Collecting complete student information
- ✅ Saving to Google Sheets automatically
- ✅ Tracking payment status in real-time
- ✅ Secure and reliable
- ✅ Easy for your team to manage

**Any questions? Let me know!** 🎉

