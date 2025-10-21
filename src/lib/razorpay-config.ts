// Razorpay Configuration
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

export const RAZORPAY_OPTIONS = {
  currency: 'INR',
  name: 'CCGE - Corporate Commerce Global Education',
  description: 'Professional Finance Certification Programs',
  image: '/assets/img/logo/CCGE Final Logo.png',
  theme: {
    color: '#2f76b7' // CCGE Blue
  }
};

