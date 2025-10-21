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
  amount: number; // Amount in paise (multiply by 100)
  courseName: string;
  courseId: number;
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

  const initiatePayment = ({
    amount,
    courseName,
    courseId,
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

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      currency: RAZORPAY_OPTIONS.currency,
      name: RAZORPAY_OPTIONS.name,
      description: `${courseName} - Course Fee`,
      image: RAZORPAY_OPTIONS.image,
      handler: function (response: RazorpayResponse) {
        console.log('Payment successful:', response);
        if (onSuccess) {
          onSuccess(response);
        } else {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        }
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        course_id: courseId,
        course_name: courseName
      },
      theme: RAZORPAY_OPTIONS.theme,
      modal: {
        ondismiss: function() {
          console.log('Payment cancelled by user');
        }
      }
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

