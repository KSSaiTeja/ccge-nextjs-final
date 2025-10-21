'use client';
import React from 'react';
import Image from 'next/image';
import logo from '@/assets/img/logo/CCGE Final Logo.png';

type IProps = {
  isOpen: boolean;
  onHide: () => void;
  paymentId: string;
  enrollmentId: string;
  amount: number;
  courseName: string;
};

export default function PaymentSuccessModal({
  isOpen,
  onHide,
  paymentId,
  enrollmentId,
  amount,
  courseName
}: IProps) {
  if (!isOpen) return null;

  const handleDownloadReceipt = () => {
    // Take screenshot instruction
    alert('Please take a screenshot of this page for your records. You can also find payment details in your email.');
  };

  return (
    <div 
      className="payment-success-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '20px',
        overflowY: 'auto',
        backdropFilter: 'blur(5px)'
      }}
    >
      <div 
        className="payment-success-modal"
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '550px',
          width: '100%',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slideUp 0.4s ease-out'
        }}
      >
        {/* Success Header with Gradient */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          padding: '40px 30px 30px',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Animated Success Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'white',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            animation: 'scaleIn 0.5s ease-out'
          }}>
            <svg 
              width="50" 
              height="50" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'white',
            marginBottom: '10px',
            letterSpacing: '-0.5px'
          }}>
            Payment Successful!
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.95)',
            margin: 0
          }}>
            Your enrollment is confirmed
          </p>
        </div>

        {/* Content Section */}
        <div style={{ padding: '35px 30px' }}>
          {/* CCGE Logo */}
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            paddingBottom: '25px',
            borderBottom: '2px solid #f3f4f6'
          }}>
            <Image 
              src={logo} 
              alt="CCGE Logo" 
              width={180} 
              height={60}
              style={{ height: 'auto' }}
            />
          </div>

          {/* Course Info */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '25px',
            border: '1px solid #bfdbfe'
          }}>
            <div style={{
              fontSize: '13px',
              color: '#6b7280',
              marginBottom: '5px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Course Enrolled
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--brand-blue-600)'
            }}>
              {courseName}
            </div>
          </div>

          {/* Payment Details - Gestalt: Law of Common Region */}
          <div style={{
            background: '#f9fafb',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '25px'
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '15px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Payment Details
            </h4>
            
            {/* Law of Proximity - Group related info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Amount Paid</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>
              
              <div style={{
                padding: '12px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>
                  Payment ID
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>
                  {paymentId}
                </div>
              </div>

              <div style={{
                padding: '12px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>
                  Enrollment ID
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>
                  {enrollmentId}
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot Reminder - Von Restorff Effect */}
          <div style={{
            background: '#fef3c7',
            padding: '15px 18px',
            borderRadius: '10px',
            marginBottom: '25px',
            border: '1px solid #fbbf24',
            display: 'flex',
            gap: '12px',
            alignItems: 'start'
          }}>
            <div style={{ fontSize: '20px', flexShrink: 0 }}>📸</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#92400e', marginBottom: '3px' }}>
                Save for Your Records
              </div>
              <div style={{ fontSize: '12px', color: '#78350f', lineHeight: '1.5' }}>
                Take a screenshot of this page for future reference. Payment details will also be sent to your email.
              </div>
            </div>
          </div>

          {/* What's Next - Miller's Law (3 items) */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '15px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              What Happens Next?
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: '📧', text: 'You will receive a confirmation email with payment receipt' },
                { icon: '🎓', text: 'Course access details will be sent within 24-48 hours' },
                { icon: '📞', text: 'Our team will contact you for onboarding' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'start',
                  padding: '10px',
                  background: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions - Fitts's Law (large targets) */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onHide}
              style={{
                flex: 1,
                padding: '16px',
                background: 'var(--brand-blue-600)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(47, 118, 183, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-blue-700)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(47, 118, 183, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-blue-600)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 118, 183, 0.3)';
              }}
            >
              Done
            </button>
          </div>

          {/* Contact Support */}
          <p style={{
            fontSize: '12px',
            color: '#9ca3af',
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: 0
          }}>
            Questions? Contact us at{' '}
            <a href="mailto:info@ccge.in" style={{ color: 'var(--brand-blue-600)', textDecoration: 'none', fontWeight: '600' }}>
              info@ccge.in
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .payment-success-modal {
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
}

