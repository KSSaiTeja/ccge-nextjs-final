import { NextRequest, NextResponse } from "next/server";

interface OrderRequest {
  amount: number;
  currency?: string;
  enrollmentId: string;
  courseId: number;
  courseName: string;
  paymentType?: string;
}

/**
 * Razorpay Orders API - Create Payment Order
 * Uses payment_capture: 1 for instant capture
 * Implements idempotency to prevent duplicate payments
 */
export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();
    
    // Validate required fields with strict checks
    if (body.amount === null || body.amount === undefined || body.amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Security: Enforce maximum amount (₹99,999,999)
    if (body.amount > 99999999) {
      return NextResponse.json(
        { error: "Amount exceeds maximum allowed" },
        { status: 400 }
      );
    }

    if (!body.enrollmentId) {
      return NextResponse.json(
        { error: "Enrollment ID is required" },
        { status: 400 }
      );
    }

    if (!body.courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Razorpay credentials not configured");
      return NextResponse.json(
        { error: "Payment service configuration error" },
        { status: 500 }
      );
    }

    // SECURITY: Validate amount is a valid number
    if (isNaN(body.amount) || !isFinite(body.amount)) {
      return NextResponse.json(
        { error: "Invalid amount format" },
        { status: 400 }
      );
    }

    // Convert amount to paise (smallest currency unit)
    const amountInPaise = Math.round(body.amount * 100);

    // Validate amount range
    if (amountInPaise < 100 || amountInPaise > 9999999900) {
      return NextResponse.json(
        { error: "Amount out of valid range" },
        { status: 400 }
      );
    }

    // Create unique receipt ID for idempotency (max 40 chars)
    const receiptId = `ENR${body.enrollmentId.slice(-8)}${Date.now().toString().slice(-10)}`.slice(0, 40);

    // Prepare Razorpay order payload
    const orderData = {
      amount: amountInPaise,
      currency: body.currency || "INR",
      receipt: receiptId,
      payment_capture: 1, // CRITICAL: This ensures instant auto-capture
      notes: {
        enrollmentId: body.enrollmentId,
        courseId: body.courseId.toString(),
        courseName: body.courseName,
        paymentType: body.paymentType || "full_payment",
        timestamp: new Date().toISOString(),
      },
    };

    // Create order via Razorpay API
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify(orderData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Razorpay order creation failed:", responseData);
      
      // Handle specific Razorpay errors
      if (responseData.error) {
        return NextResponse.json(
          { 
            error: "Payment order creation failed",
            details: responseData.error.description || "Please try again",
            code: responseData.error.code
          },
          { status: response.status }
        );
      }

      return NextResponse.json(
        { error: "Payment service temporarily unavailable" },
        { status: 503 }
      );
    }

    // Log successful order creation (without sensitive data)
    console.log("Order created successfully:", {
      orderId: responseData.id,
      amount: amountInPaise,
      enrollmentId: body.enrollmentId,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      orderId: responseData.id,
      amount: amountInPaise,
      currency: responseData.currency,
      receipt: receiptId,
      status: responseData.status,
      createdAt: responseData.created_at,
    });

  } catch (error) {
    console.error("Order creation error:", error);
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
