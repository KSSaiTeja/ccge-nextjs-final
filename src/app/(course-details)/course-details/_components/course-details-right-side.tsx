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
   const [paymentDetails, setPaymentDetails] = useState({
      paymentId: '',
      enrollmentId: '',
      amount: 0,
      courseName: ''
   });
   const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOption | null>(
      installmentOptions?.[0] || null
   );
   const { initiatePayment, isLoaded } = useRazorpay();

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
            onSuccess: async (response) => {
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
               {isLiveCourse ? (
                  <a 
                     onClick={handleBuyNow}
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
                     {isLoaded ? 'Buy Now - Pay with Razorpay' : 'Buy Now'}
                  </a>
               ) : (
                  <a 
                     className="ccge-btn-primary" 
                     style={{
                        cursor: 'default',
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
                     Buy Now
                  </a>
               )}
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
                     <span>{course.duration}</span>
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
      </>
   )
}
