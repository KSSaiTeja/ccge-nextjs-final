'use client';
import Image from "next/image";
import { CertificateSvg, DurationSvg, LanguageSvg } from "@/components/svg";
import { ICourseDT } from "@/types/course-d-t";
import { useState } from "react";
import EnrollmentModal from "@/components/modal/enrollment-modal";

type IProps = {
   course: ICourseDT;
};

export default function CourseDetailsRightSide({ course }: IProps) {
   const { thumbnail, fees } = course || {};
   const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

   return (
      <>
      <div className="tp-course-details-2-widget">
         <div className="tp-course-details-2-widget-thumb p-relative">
            <Image src={thumbnail || '/assets/img/course/details/course.jpg'} alt="course-img" width={400} height={300} />
         </div>
         <div className="tp-course-details-2-widget-content">
            <div className="tp-course-details-2-widget-price">
               <span style={{fontSize: '32px', fontWeight: '700', color: 'var(--tp-heading-2)'}}>{fees}</span>
            </div>
            <div className="tp-course-details-2-widget-btn">
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
      </>
   )
}
