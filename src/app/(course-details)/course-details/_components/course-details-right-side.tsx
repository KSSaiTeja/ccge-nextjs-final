'use client';
import Image from "next/image";
import { CertificateSvg, DurationSvg, LanguageSvg } from "@/components/svg";
import { ICourseDT } from "@/types/course-d-t";
import { useState } from "react";
import EnrollmentModal from "@/components/modal/enrollment-modal";
import PaymentEnrollmentModal from "@/components/modal/payment-enrollment-modal";
import PaymentSuccessModal from "@/components/modal/payment-success-modal";
import { useRazorpay } from "@/hooks/use-razorpay";
import PaymentOptions from "@/components/course/payment-options";

type IProps = {
   course: ICourseDT;
};

type PaymentOption = {
  months: number;
  amount: number;
  label?: string;
  discount?: number;
};

export default function CourseDetailsRightSide({ course }: IProps) {
   const { thumbnail, fees, isLiveCourse, installmentOptions, title, id } = course || {};
   const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
   const [isPaymentEnrollmentOpen, setIsPaymentEnrollmentOpen] = useState(false);
   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
   const [isConstructionModalOpen, setIsConstructionModalOpen] = useState(false);
   const [paymentDetails, setPaymentDetails] = useState({
      paymentId: '',
      enrollmentId: '',
      amount: 0,
      courseName: ''
   });
   const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOption | null>(
      installmentOptions?.[0] || null
   );
   const { initiatePayment } = useRazorpay();

   const handleBuyNow = () => {
      if (isLiveCourse && selectedPaymentOption) {
         // Open payment enrollment form first
         setIsPaymentEnrollmentOpen(true);
      }
   };

   const handleEnrollmentSubmitSuccess = (newEnrollmentId: string) => {
      // Close form
      setIsPaymentEnrollmentOpen(false);
      
      // Open Razorpay payment
      if (selectedPaymentOption) {
         const paymentAmount = selectedPaymentOption.amount;
         
         initiatePayment({
            amount: paymentAmount,
            courseName: `${title} - ${selectedPaymentOption.label || `${selectedPaymentOption.months} Installment(s)`}`,
            courseId: id,
            enrollmentId: newEnrollmentId,
            onSuccess: async (response) => {
               // STEP 1: Verify payment signature with backend (CRITICAL SECURITY)
               try {
                  const verifyResponse = await fetch('/api/razorpay/verify', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id || '',
                        razorpay_signature: response.razorpay_signature || '',
                        enrollmentId: newEnrollmentId
                     })
                  });

                  const verifyData = await verifyResponse.json();
                  
                  if (!verifyData.success) {
                     console.error('Payment verification failed:', verifyData);
                     alert('Payment verification failed. Please contact support with Payment ID: ' + response.razorpay_payment_id);
                     return;
                  }
                  
                  console.log('✅ Payment verified and captured:', verifyData);
               } catch (verifyError) {
                  console.error('Verification error:', verifyError);
                  alert('Payment verification error. Please contact support.');
                  return;
               }

               // Update payment status in Google Sheets
               try {
                  await fetch('/api/enrollment/update-payment', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                        enrollmentId: newEnrollmentId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id || '',
                        razorpaySignature: response.razorpay_signature || ''
                     })
                  });
                  
                  // Show custom success modal
                  setPaymentDetails({
                     paymentId: response.razorpay_payment_id,
                     enrollmentId: newEnrollmentId,
                     amount: paymentAmount,
                     courseName: title
                  });
                  setIsSuccessModalOpen(true);
               } catch (error) {
                  console.error('Failed to update payment status:', error);
                  alert(`Payment successful but failed to update status. Please contact support with Enrollment ID: ${newEnrollmentId}`);
               }
            },
            onFailure: async (error) => {
               // Update to failed status
               try {
                  await fetch('/api/enrollment/update-payment', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                        enrollmentId: newEnrollmentId,
                        razorpayPaymentId: 'FAILED',
                        status: '❌ Payment Failed'
                     })
                  });
               } catch (err) {
                  console.error('Failed to update failed status:', err);
               }
               
               alert('❌ Payment failed. Please try again or contact support.');
               console.error('Payment error:', error);
            }
         });
      }
   };

   const handlePaymentOptionChange = (option: PaymentOption) => {
      setSelectedPaymentOption(option);
   };

   return (
      <>
      <div className="tp-course-details-2-widget">
         <div className="tp-course-details-2-widget-thumb p-relative">
            <Image src={thumbnail || '/assets/img/course/details/course.jpg'} alt="course-img" width={400} height={300} />
         </div>
         <div className="tp-course-details-2-widget-content">
            <div className="tp-course-details-2-widget-price">
               <span style={{fontSize: '32px', fontWeight: '700', color: 'var(--tp-heading-2)'}}>{fees}</span>
               {isLiveCourse && (
                  <div style={{marginTop: '10px'}}>
                     <span style={{
                        display: 'inline-block',
                        background: '#FFC221',
                        color: '#1E1E2F',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600'
                     }}>
                        🎥 Live Course
                     </span>
                  </div>
               )}
            </div>
            {/* Payment Options Component - UX Optimized */}
            {isLiveCourse && installmentOptions && installmentOptions.length > 0 && (
               <PaymentOptions course={course} onPaymentSelect={handlePaymentOptionChange} />
            )}
            
            <div className="tp-course-details-2-widget-btn">
               <a 
                  onClick={isLiveCourse ? handleBuyNow : () => setIsConstructionModalOpen(true)}
                  className="ccge-btn-primary" 
                  style={{
                     cursor: 'pointer',
                     display: 'block',
                     fontSize: '17px',
                     fontWeight: '500',
                     borderRadius: '6px',
                     padding: '11px 15px',
                     textAlign: 'center',
                     color: '#ffffff',
                     border: 'none',
                     background: 'var(--brand-blue-600)',
                     boxShadow: 'inset 0 1px 4px 0 rgba(48, 54, 81, 0.06), 0 1px 1px 0 rgba(48, 54, 81, 0.06)',
                     marginBottom: '10px',
                     transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.background = 'var(--brand-blue-700)';
                     e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'var(--brand-blue-600)';
                     e.currentTarget.style.color = '#ffffff';
                  }}
               >
                  Register and Pay
               </a>
               <a 
                  onClick={() => setIsEnrollmentOpen(true)} 
                  style={{
                     cursor: 'pointer',
                     display: 'block',
                     fontSize: '17px',
                     fontWeight: '500',
                     borderRadius: '6px',
                     padding: '11px 15px',
                     textAlign: 'center',
                     color: 'var(--brand-blue-600)',
                     border: '1px solid var(--brand-blue-600)',
                     background: 'var(--tp-common-white)',
                     boxShadow: 'inset 0 1px 4px 0 rgba(48, 54, 81, 0.06), 0 1px 1px 0 rgba(48, 54, 81, 0.06)',
                     transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.background = 'var(--brand-blue-600)';
                     e.currentTarget.style.color = '#ffffff';
                     e.currentTarget.style.borderColor = 'var(--brand-blue-600)';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'var(--tp-common-white)';
                     e.currentTarget.style.color = 'var(--brand-blue-600)';
                     e.currentTarget.style.borderColor = 'var(--brand-blue-600)';
                  }}
               >
                  Enquire Details
               </a>
               <p>Transform Your Career with Globally Recognized Certification</p>
            </div>

            <div className="tp-course-details-2-widget-list">
               <h5>This course includes:</h5>

               <div className="tp-course-details-2-widget-list-item-wrapper">

                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <DurationSvg /> Duration</span>
                     <span>{(id === 11) ? 'Less than a month' : course.duration}</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <LanguageSvg /> Language</span>
                     <span>{course.language}</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <CertificateSvg /> Certificate</span>
                     <span>Yes</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <EnrollmentModal
         isOpen={isEnrollmentOpen}
         onHide={() => setIsEnrollmentOpen(false)}
      />
      {isLiveCourse && selectedPaymentOption && (
         <PaymentEnrollmentModal
            isOpen={isPaymentEnrollmentOpen}
            onHide={() => setIsPaymentEnrollmentOpen(false)}
            course={course}
            selectedPaymentOption={selectedPaymentOption}
            onSubmitSuccess={handleEnrollmentSubmitSuccess}
         />
      )}
      <PaymentSuccessModal
         isOpen={isSuccessModalOpen}
         onHide={() => setIsSuccessModalOpen(false)}
         paymentId={paymentDetails.paymentId}
         enrollmentId={paymentDetails.enrollmentId}
         amount={paymentDetails.amount}
         courseName={paymentDetails.courseName}
      />
      
      {/* Under Construction Modal for non-live courses */}
      {isConstructionModalOpen && (
         <div 
            className="modal-overlay" 
            style={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: 'rgba(0, 0, 0, 0.75)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               zIndex: 9999,
               padding: '20px'
            }}
            onClick={(e) => e.target === e.currentTarget && setIsConstructionModalOpen(false)}
         >
            <div 
               style={{
                  background: 'white',
                  borderRadius: '20px',
                  maxWidth: '500px',
                  width: '100%',
                  padding: '40px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  textAlign: 'center'
               }}
            >
               <button
                  onClick={() => setIsConstructionModalOpen(false)}
                  style={{
                     position: 'absolute',
                     top: '15px',
                     right: '15px',
                     background: 'none',
                     border: 'none',
                     fontSize: '28px',
                     cursor: 'pointer',
                     color: '#6c757d',
                     lineHeight: 1,
                     padding: '5px 10px'
                  }}
               >
                  ×
               </button>

               {/* Icon */}
               <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 25px',
                  background: 'linear-gradient(135deg, #FFC221 0%, #FFD96B 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px'
               }}>
                  🚧
               </div>

               {/* Title */}
               <h3 style={{
                  fontSize: '26px',
                  fontWeight: '700',
                  color: 'var(--tp-heading-2)',
                  marginBottom: '15px'
               }}>
                  Course Registration Coming Soon
               </h3>

               {/* Message */}
               <p style={{
                  fontSize: '16px',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  marginBottom: '25px'
               }}>
                  We&apos;re setting up the payment system for <strong>{title}</strong>. Our team is working hard to bring you a seamless enrollment experience.
               </p>

               {/* Info Box */}
               <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '25px',
                  textAlign: 'left'
               }}>
                  <h5 style={{
                     fontSize: '14px',
                     fontWeight: '600',
                     color: 'var(--tp-heading-2)',
                     marginBottom: '12px'
                  }}>
                     📞 Want to Enroll Now?
                  </h5>
                  <p style={{
                     fontSize: '14px',
                     color: '#6c757d',
                     marginBottom: '10px'
                  }}>
                     Contact our team directly:
                  </p>
                  <div style={{ fontSize: '14px', color: 'var(--brand-blue-600)', fontWeight: '600' }}>
                     📧 info@ccge.in<br/>
                     📱 +91 96666 60713 / 14
                  </div>
               </div>

               {/* Action Buttons */}
               <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <button
                     onClick={() => {
                        setIsConstructionModalOpen(false);
                        setIsEnrollmentOpen(true);
                     }}
                     style={{
                        padding: '12px 25px',
                        background: 'var(--brand-blue-600)',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(47, 118, 183, 0.3)',
                        transition: 'all 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--brand-blue-700)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                     }}
                     onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--brand-blue-600)';
                        e.currentTarget.style.transform = 'translateY(0)';
                     }}
                  >
                     Enquire Now
                  </button>
                  <button
                     onClick={() => setIsConstructionModalOpen(false)}
                     style={{
                        padding: '12px 25px',
                        background: 'white',
                        border: '2px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        color: '#6c757d',
                        transition: 'all 0.3s ease'
                     }}
                  >
                     Close
                  </button>
               </div>
            </div>
         </div>
      )}
      </>
   )
}
