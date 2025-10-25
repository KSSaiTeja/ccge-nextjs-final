# 🧪 Testing Payment Failure Scenarios

## How to Test Payment Failure

### **Method 1: Use Razorpay Test Card for Failure (Recommended)**

Razorpay provides specific test cards that will always fail:

#### **Card That Always Fails:**
```
Card Number: 5104 0600 0000 0008
CVV: Any 3 digits (e.g., 123)
Expiry: Any future date (e.g., 12/25)
Name: Test User
```

#### **Other Test Failure Scenarios:**
```
Insufficient Funds: 5104 0600 0000 0008
Invalid Card: 5204 0600 0000 0009
Declined: 5104 0600 0000 0016
```

### **Method 2: Test Cards (For Different Scenarios)**

#### **Success Cards:**
```
Card: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
→ This will succeed
```

#### **Failure Cards:**
```
Card: 5104 0600 0000 0008
CVV: Any 3 digits
Expiry: Any future date
→ This will fail (insufficient funds)
```

#### **Always Fails:**
```
Card: 4111 1111 1111 1111
CVV: 999
Expiry: Past date
Name: "Bad Card"
→ This will fail immediately
```

---

## 🎯 Step-by-Step Test Process

### **Test Case: Failed Payment Then Retry**

#### **Step 1: Make Payment Fail**
1. Fill enrollment form
2. Select payment option
3. Click "Register and Pay"
4. When Razorpay modal opens, enter:
   ```
   Card Number: 5104 0600 0000 0008
   CVV: 123
   Expiry: 12/25
   ```
5. Submit payment
6. **Expected Result:** Payment fails with error message

#### **Step 2: Verify Sheet Shows "Failed"**
1. Check Google Sheets
2. **Expected:** Payment Status column shows "❌ Payment Failed"
3. **Expected:** Razorpay Payment ID column shows "FAILED"

#### **Step 3: Retry Payment (Same Session)**
1. **DON'T refresh or close the page**
2. Click payment button again
3. Enter details again:
   ```
   Card Number: 4111 1111 1111 1111 (Success card)
   CVV: 123
   Expiry: 12/25
   ```
4. Submit payment
5. **Expected Result:** Payment succeeds

#### **Step 4: Verify Sheet Updates**
1. Check Google Sheets again
2. **Expected:** Payment Status updated to "✅ Paid"
3. **Expected:** Razorpay Payment ID shows actual payment ID (starts with "pay_")
4. **Expected:** Payment Date updated
5. **Expected:** Payment Method shows "Razorpay"

---

## 🔍 What to Look For

### **Console Logs (Check Browser Developer Tools)**

#### **When Payment Fails:**
```javascript
Payment failed: {error object}
Failed to update failed status: (if any error)
```

#### **When Retry Succeeds:**
```javascript
✅ Payment verified and captured: {details}
Payment status updated successfully
```

#### **In Server Logs (Terminal):**
```javascript
// When failed:
Payment status updated: FAILED

// When retry succeeds:
Payment already recorded - skipping duplicate update
Payment status updated successfully: Paid
```

---

## 📊 Test Scenarios

### **Scenario 1: Simple Failure**
1. Use failing card
2. Payment fails
3. Sheet updates to "Failed" ✅

### **Scenario 2: Failure Then Success**
1. Use failing card → Fails
2. Sheet shows "Failed"
3. Use success card → Succeeds
4. Sheet updates to "Paid" ✅

### **Scenario 3: Network Error (Advanced)**
1. Start payment
2. Turn off internet immediately
3. Try to complete payment
4. Should show error
5. Sheet should show "Failed"

### **Scenario 4: User Cancellation**
1. Start payment
2. Close Razorpay modal without paying
3. Sheet should remain in previous state (not updated)
4. User can retry

---

## 🛠️ Manual Testing Checklist

### **Before Starting:**
- [ ] Test mode enabled in Razorpay dashboard
- [ ] Test keys in `.env.local`
- [ ] Google Sheets accessible
- [ ] Browser console open (F12)

### **Test 1: Failure**
- [ ] Use failing card (5104 0600 0000 0008)
- [ ] Payment fails
- [ ] Sheet shows "❌ Payment Failed"
- [ ] Console shows error logs

### **Test 2: Retry Success**
- [ ] Use success card (4111 1111 1111 1111)
- [ ] Payment succeeds
- [ ] Sheet updates to "✅ Paid"
- [ ] Console shows verification success
- [ ] Success modal appears

### **Test 3: Verify No Duplicates**
- [ ] Check same payment ID not processed twice
- [ ] Check sheet has single entry
- [ ] Console shows "already processed" if retry

---

## 🐛 Troubleshooting

### **Issue: Payment doesn't fail even with failure card**

**Solution:**
- Make sure you're in **Test Mode**
- Check Razorpay test keys are being used
- Try different failure card: `5204 0600 0000 0009`

### **Issue: Sheet doesn't update on failure**

**Solution:**
- Check browser console for errors
- Check server terminal for error logs
- Verify API call to `/api/enrollment/update-payment` succeeds
- Check Google Sheets API credentials

### **Issue: Retry doesn't update from Failed to Paid**

**Solution:**
- Check if enrollment ID is same for both attempts
- Check server logs for "idempotency check"
- Verify payment verification succeeds
- Check Google Sheets for row updates

---

## 📸 Expected Results

### **Google Sheets Before Retry:**
```
| Enrollment ID | Payment Status | Payment ID  | Payment Date |
|---------------|----------------|-------------|--------------|
| ENR123456     | ❌ Payment Failed | FAILED    | 2024-01-01   |
```

### **Google Sheets After Successful Retry:**
```
| Enrollment ID | Payment Status | Payment ID     | Payment Date |
|---------------|----------------|----------------|--------------|
| ENR123456     | ✅ Paid        | pay_abc123     | 2024-01-01   |
```

---

## 🎬 Quick Test Script

**Copy this and follow step-by-step:**

1. Open browser
2. Go to course page
3. Click "Register and Pay"
4. Fill enrollment form
5. **FAILURE TEST:**
   - Card: `5104 0600 0000 0008`
   - CVV: `123`
   - Check sheet → Should show "Failed"
6. **RETRY TEST:**
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Check sheet → Should show "Paid"

---

## ✅ Success Criteria

✅ Payment fails with failing card  
✅ Sheet shows "Failed" status  
✅ Payment succeeds with success card  
✅ Sheet updates to "Paid" status  
✅ No duplicate records in sheet  
✅ Console shows proper logs  
✅ Success modal appears  

---

**Ready to test? Start with Method 1 above!** 🚀
