import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'courseName', 'amount'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
    if (!sheetId) {
      throw new Error('Google Sheets ID not configured');
    }

    const sheets = getGoogleSheetsClient();
    
    // Generate unique enrollment ID
    const enrollmentId = `ENR${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // Prepare row data - matching the exact order you want in Google Sheets
    const rowData = [
      timestamp,                                    // A: Timestamp
      enrollmentId,                                 // B: Enrollment ID
      body.fullName,                                // C: Full Name
      body.email,                                   // D: Email
      body.phone,                                   // E: Phone
      body.whatsappSame ? 'Yes' : 'No',            // F: WhatsApp Available
      body.dateOfBirth,                             // G: Date of Birth
      body.gender || 'Not Specified',               // H: Gender
      body.address,                                 // I: Address
      body.city,                                    // J: City
      body.state,                                   // K: State
      body.pincode,                                 // L: Pincode
      body.country,                                 // M: Country
      body.qualification,                           // N: Qualification
      body.fieldOfStudy,                            // O: Field of Study
      body.collegeName,                             // P: College/University
      body.yearOfCompletion,                        // Q: Year of Completion
      body.occupation,                              // R: Occupation
      body.companyName || 'N/A',                    // S: Company Name
      body.yearsOfExperience || '0',                // T: Years of Experience
      body.courseName,                              // U: Course Name
      body.courseId,                                // V: Course ID
      body.paymentPlan,                             // W: Payment Plan
      `₹${body.amount.toLocaleString('en-IN')}`,   // X: Amount to Pay
      `₹${body.totalAmount.toLocaleString('en-IN')}`, // Y: Total Course Fee
      body.preferredStartDate,                      // Z: Preferred Start Date
      'Pending Payment',                            // AA: Payment Status
      '',                                           // AB: Razorpay Payment ID
      '',                                           // AC: Payment Date
      '',                                           // AD: Payment Method
      body.acceptTerms ? 'Yes' : 'No',             // AE: Terms Accepted
      '',                                           // AF: LMS Access Granted
      '',                                           // AG: Notes
    ];

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:AG', // Adjust sheet name if different
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({
      success: true,
      enrollmentId,
      message: 'Enrollment details saved successfully'
    });

  } catch (error) {
    console.error('Enrollment creation error:', error);
    
    // Check if it's a Google Sheets API error
    if (error instanceof Error) {
      if (error.message.includes('credentials')) {
        return NextResponse.json(
          { error: 'Google Sheets not configured. Please contact administrator.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to save enrollment details. Please try again.' },
      { status: 500 }
    );
  }
}

