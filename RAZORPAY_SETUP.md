# Razorpay Integration Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Razorpay API Keys

1. Login to your [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **API Keys**
3. For **TEST MODE** (recommended for now):
   - Toggle to "Test Mode" in dashboard
   - Copy your **Test Key ID** (starts with `rzp_test_...`)
   - Click "Generate" or reveal your **Test Key Secret**
4. For **LIVE MODE** (when ready to go live):
   - Use your **Live Key ID** (starts with `rzp_live_...`)
   - Use your **Live Key Secret**

### Step 2: Add Environment Variables

Create a file named `.env.local` in the project root and add:

**For TEST MODE (Use this first):**
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET
```

**For LIVE MODE (When ready for production):**
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

**Important:** 
- Replace `YOUR_ACTUAL_KEY_ID` and `YOUR_ACTUAL_KEY_SECRET` with your real keys
- Never commit `.env.local` to git (it's already in .gitignore)
- The `NEXT_PUBLIC_` prefix is required for client-side access

### Step 3: Restart Development Server

```bash
npm run dev
```

That's it! The integration is ready.

---

## ✅ What's Already Implemented

### Live Courses with Razorpay Integration
- **US Taxation & Accounting (EA) Course** (₹45,000)
  - Full Payment: ₹40,000 (Save ₹5,000!)
  - 2 Installments: First ₹25,000, Second ₹20,000
  
- **UK Taxation & Accounting Course** (₹25,000)
  - Full Payment: ₹20,000 (Save ₹5,000!)
  - 2 Installments: First ₹15,000, Second ₹10,000

### Features Implemented
✅ Razorpay payment gateway integration
✅ Installment options display on course details page
✅ "Live Course" badge for EA and UK Taxation
✅ Buy Now button triggers Razorpay checkout for live courses
✅ Payment success/failure handling
✅ Mobile-responsive payment UI
✅ CCGE branding in payment modal

---

## 🔧 How It Works

### For Live Courses (EA & UK Taxation):
1. **Course Details Page** shows:
   - 🎥 Live Course badge
   - Full course fee
   - Installment options (if available)
   - "Buy Now - Pay with Razorpay" button

2. **When user clicks Buy Now**:
   - Razorpay checkout modal opens
   - User can pay full amount or select installment
   - Secure payment processing
   - Success/failure notification

3. **Payment Success**:
   - Payment ID is generated
   - You can capture this for enrollment confirmation
   - User receives confirmation

### For Other Courses:
- "Buy Now" button is non-functional (as requested)
- "Enquire Details" opens enrollment modal

---

## 📝 Next Steps (Optional Backend Integration)

For production, you should:

1. **Create Payment Order API** (`/api/razorpay/create-order`)
   - Verify amount server-side
   - Generate order ID
   - Return to frontend

2. **Verify Payment API** (`/api/razorpay/verify-payment`)
   - Verify payment signature
   - Update database with enrollment
   - Send confirmation email

3. **Webhook Handler** (`/api/razorpay/webhook`)
   - Handle payment.success, payment.failed events
   - Auto-enroll students
   - Send notifications

Example API structure is in the code comments.

---

## 🎯 Testing

### Test Mode (Before Going Live):
1. Use test keys: `rzp_test_...`
2. Test card: 4111 1111 1111 1111
3. Any CVV and future expiry date

### Live Mode:
1. Use live keys: `rzp_live_...`
2. Real payments will be processed
3. Monitor in Razorpay Dashboard

---

## 💰 Installment Configuration

To modify installment options, edit `/src/data/ccge-courses-data.ts`:

```typescript
installmentOptions: [
  { months: 3, amount: 5000 },   // 3-month plan
  { months: 6, amount: 2500 },   // 6-month plan
  { months: 12, amount: 1250 }   // 12-month plan
]
```

---

## 🆘 Troubleshooting

**Payment button not working?**
- Check `.env.local` exists with correct keys
- Restart dev server after adding env variables
- Check browser console for errors

**"Payment configuration error" alert?**
- Razorpay Key ID is missing or incorrect
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set

**Payment succeeds but nothing happens?**
- Check browser console for payment response
- Implement backend verification for production

---

## 📞 Support

For Razorpay issues:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Integration Guide](https://razorpay.com/docs/payments/payment-gateway/web-integration/)
- Support: support@razorpay.com

