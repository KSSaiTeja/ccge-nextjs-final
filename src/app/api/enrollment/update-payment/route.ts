import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import crypto from 'crypto';

// Initialize Google Sheets API
const getGoogleSheetsClient = () => {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials not configured');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

// Verify Razorpay payment signature
const verifyPaymentSignature = (orderId: string, paymentId: string, signature: string): boolean => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keySecret) {
    throw new Error('Razorpay key secret not configured');
  }

  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { enrollmentId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;
    
    // Validate required fields
    if (!enrollmentId || !razorpayPaymentId) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Verify payment signature (security check)
    if (razorpayOrderId && razorpaySignature) {
      const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid payment signature' },
          { status: 400 }
        );
      }
    }

    const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
    if (!sheetId) {
      throw new Error('Google Sheets ID not configured');
    }

    const sheets = getGoogleSheetsClient();
    
    // Get all enrollment data to find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:AG',
    });

    const rows = response.data.values || [];
    let rowIndex = -1;

    // Find the row with matching enrollment ID (column B, index 1)
    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header
      if (rows[i][1] === enrollmentId) {
        rowIndex = i + 1; // +1 because sheets are 1-indexed
        break;
      }
    }

    if (rowIndex === -1) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    const paymentDate = new Date().toISOString();

    // Update payment status columns (AA, AB, AC, AD)
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Sheet1!AA${rowIndex}:AD${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          '✅ Paid',                    // AA: Payment Status
          razorpayPaymentId,           // AB: Razorpay Payment ID
          paymentDate,                 // AC: Payment Date
          'Razorpay'                   // AD: Payment Method
        ]],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment status updated successfully'
    });

  } catch (error) {
    console.error('Payment update error:', error);
    
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}

