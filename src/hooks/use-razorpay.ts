'use client';
import { useEffect, useState } from 'react';
import { RAZORPAY_KEY_ID, RAZORPAY_OPTIONS } from '@/lib/razorpay-config';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, unknown>;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export interface RazorpayPaymentOptions {
  amount: number; // Amount in rupees
  courseName: string;
  courseId: number;
  enrollmentId: string;
  orderId?: string; // Optional: if already created
  onSuccess?: (response: RazorpayResponse) => void;
  onFailure?: (error: RazorpayError) => void;
}

export function useRazorpay() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initiatePayment = async ({
    amount,
    courseName,
    courseId,
    enrollmentId,
    orderId,
    onSuccess,
    onFailure
  }: RazorpayPaymentOptions) => {
    if (!isLoaded) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }

    if (!RAZORPAY_KEY_ID) {
      alert('Payment configuration error. Please contact support.');
      return;
    }

    let finalOrderId = orderId;

    // If no order ID provided, create one
    if (!finalOrderId) {
      try {
        const orderResponse = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            currency: 'INR',
            enrollmentId,
            courseId,
            courseName,
          }),
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
          console.error('Failed to create order:', orderData);
          alert(orderData.error || 'Failed to initialize payment. Please try again.');
          return;
        }

        finalOrderId = orderData.orderId;
      } catch (error) {
        console.error('Error creating order:', error);
        alert('Payment initialization failed. Please try again.');
        return;
      }
    }

    // Razorpay options with order ID
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      currency: RAZORPAY_OPTIONS.currency,
      order_id: finalOrderId, // CRITICAL: Use order ID for auto-capture
      name: RAZORPAY_OPTIONS.name,
      description: `${courseName} - Course Fee`,
      image: RAZORPAY_OPTIONS.image,
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        course_id: courseId,
        course_name: courseName,
        enrollment_id: enrollmentId
      },
      theme: RAZORPAY_OPTIONS.theme,
      modal: {
        ondismiss: function() {
          console.log('Payment cancelled by user');
        }
      },
      handler: function (response: RazorpayResponse) {
        console.log('Payment successful:', response);
        if (onSuccess) {
          onSuccess(response);
        } else {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    
    razorpay.on('payment.failed', function (response: { error: RazorpayError }) {
      console.error('Payment failed:', response.error);
      if (onFailure) {
        onFailure(response.error);
      } else {
        alert('Payment failed. Please try again.');
      }
    });

    razorpay.open();
  };

  return { initiatePayment, isLoaded };
}

