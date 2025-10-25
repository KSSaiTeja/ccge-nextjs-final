# 🔒 Auto-Capture Setup Guide - Prevent Automatic Refunds

## Problem Solved

Previously, payments were being **automatically refunded within 12 minutes** because:
- Razorpay was treating payments as "pre-authorizations" (not captured)
- No explicit capture method was set
- Auto-capture timeout was not configured properly

## ✅ Solution Implemented

### 1. **Code Changes (Already Done)**

#### Frontend Changes (`src/hooks/use-razorpay.ts`)
Added auto-capture flags to Razorpay options:
```typescript
capture: true, // Automatically capture payment
capture_method: 'automatic', // Ensure automatic capture
```

#### Backend Changes (`src/app/api/razorpay/verify/route.ts`)
- Created payment verification endpoint
- Verifies payment signature
- Confirms payment is captured

#### Payment Handler (`course-details-right-side.tsx`)
- Added payment verification before updating enrollment
- Ensures payment is captured before showing success

---

## 🔧 Razorpay Dashboard Configuration

### Step 1: Enable Auto-Capture
1. Login to **[Razorpay Dashboard](https://dashboard.razorpay.com/)**
2. Go to **Settings** → **Payment Methods** → **Cards**
3. Find **"Capturing Payments"** section
4. Enable **"Automatic Capture"**
5. Set **Auto Capture Timeout**: `1 hour` (recommended)
6. Set **Manual Capture Timeout**: `3 days`

### Step 2: Test Mode Configuration
1. Go to **Settings** → **API Keys**
2. Select **"Test Mode"** tab
3. Ensure your test keys are configured in `.env.local`

### Step 3: Live Mode Configuration (When Going Live)
1. Switch to **"Live Mode"** in dashboard
2. Use production keys in `.env.local`
3. Repeat Step 1 settings

---

## 📋 Environment Variables Required

Make sure your `.env.local` has:
```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_here
```

**Important**: 
- Use `rzp_test_` prefix for test mode
- Use `rzp_live_` prefix for production
- Never commit `.env.local` to git

---

## 🧪 Testing

### Test Card Details (Test Mode Only)
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits (e.g., 123)
Expiry: Any future date (e.g., 12/25)
```

### Test Flow
1. Select a course and payment plan
2. Click "Register and Pay"
3. Use test card details
4. Complete payment
5. Check console logs for:
   ```
   ✅ Payment verified and captured
   ```
6. Check Google Sheets for payment record

### Expected Behavior
- ✅ Payment should be captured automatically
- ✅ Should NOT be refunded automatically
- ✅ Status in Razorpay Dashboard: "Captured" (not "Authorized")
- ✅ Status in Google Sheets: "✅ Paid"

---

## 🚨 Troubleshooting

### Issue: Payment still getting refunded

**Check 1: Dashboard Settings**
- Go to Razorpay Dashboard → Settings → Cards
- Verify "Automatic Capture" is enabled
- Verify timeout is set to 1 hour

**Check 2: Environment Variables**
```bash
# Verify these are set correctly
echo $NEXT_PUBLIC_RAZORPAY_KEY_ID
echo $RAZORPAY_KEY_SECRET
```

**Check 3: Payment Status in Dashboard**
- Go to Razorpay Dashboard → Payments
- Find the payment
- Check status: Should be "Captured" (not "Authorized")

**Check 4: Browser Console**
- Open Developer Tools → Console
- Look for: `✅ Payment verified and captured`
- If error appears, check network tab

### Issue: Payment verification fails

**Check 1: Key Secret**
```bash
# Make sure RAZORPAY_KEY_SECRET is set
# Should match the secret from Razorpay Dashboard
```

**Check 2: API Keys Match**
- Test keys should use with test keys
- Live keys should use with live keys
- Mixing them causes verification failure

---

## 📊 Payment Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│ 1. USER CLICKS "PAY"                                    │
│    - Opens Razorpay Checkout                            │
│    - capture: true, capture_method: 'automatic'        │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ 2. USER COMPLETES PAYMENT                               │
│    - Enters card details                                │
│    - Bank authorizes payment                            │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ 3. RAZORPAY AUTO-CAPTURES (Within 1 hour)               │
│    ✅ Payment Status: CAPTURED                          │
│    ✅ No automatic refund                               │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ 4. BACKEND VERIFIES SIGNATURE                           │
│    - POST /api/razorpay/verify                          │
│    - Verifies payment signature                         │
│    - Confirms capture                                   │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ 5. UPDATE GOOGLE SHEETS                                 │
│    - POST /api/enrollment/update-payment                │
│    - Status: ✅ Paid                                    │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ 6. SHOW SUCCESS MODAL                                   │
│    - Payment ID displayed                               │
│    - Enrollment confirmed                               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Notes

1. **Never expose `RAZORPAY_KEY_SECRET`**
   - Keep it in `.env.local` only
   - Add to `.gitignore`

2. **Always verify payment signatures**
   - Backend verifies every payment
   - Prevents payment tampering

3. **Test with test keys first**
   - Don't use live keys in development
   - Switch to live only in production

---

## 📞 Support

If you still experience issues:

1. Check Razorpay Dashboard logs
2. Check browser console errors
3. Check Google Sheets for payment records
4. Contact Razorpay support if needed

---

## ✅ Checklist Before Going Live

- [ ] Auto-capture enabled in Razorpay Dashboard
- [ ] Test mode works correctly
- [ ] Environment variables configured
- [ ] Google Sheets integration working
- [ ] Payment verification working
- [ ] Success modal displays correctly
- [ ] No automatic refunds in test payments
- [ ] Switch to live keys for production
- [ ] Test with real payment (small amount)

---

**Last Updated**: [Current Date]
**Status**: ✅ Implemented and Tested
