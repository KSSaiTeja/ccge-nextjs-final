'use client';
import Image from "next/image";
import shape_underline from "@/assets/img/unlerline/cta-2-svg-1.svg";
import { CheckSvg } from "../svg";
import { useState } from "react";
import EnrollmentModal from "../modal/enrollment-modal";

export default function CtaTwo() {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  return (
    <>
    <section className="cta-area tp-cta-2-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-lg-10">
            <div className="tp-cta-2-wrapper text-center">
              <h2 className="tp-cta-2-title">
                Ready to Transform Your {' '}
                <span>
                  Career?
                  <Image
                    className="tp-underline-shape-12 wow bounceIn"
                    data-wow-duration="1.5s"
                    data-wow-delay=".4s"
                    src={shape_underline}
                    alt="shape-underline"
                  />
                </span>
              </h2>
              <p style={{fontSize: '18px', marginTop: '20px', marginBottom: '30px'}}>
                Join CCGE and unlock your potential with globally recognized finance certifications and expert career support.
              </p>
              <div style={{marginTop: '30px', marginBottom: '30px'}}>
                <button 
                  className="tp-btn-round" 
                  onClick={() => setIsEnrollmentOpen(true)}
                  style={{
                    backgroundColor: '#FFC221',
                    color: '#1E1E2F',
                    border: 'none',
                    padding: '18px 50px',
                    fontSize: '18px',
                    fontWeight: '700',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(255, 194, 33, 0.4)',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFD54F';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 194, 33, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFC221';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 194, 33, 0.4)';
                  }}
                >
                  Enquire Now!
                </button>
              </div>
              <div className="tp-cta-2-info-list">
                <span>
                  <span>
                    <CheckSvg />
                  </span>
                  Expert Faculty
                </span>
                <span>
                  <span>
                    <CheckSvg />
                  </span>
                  Global Certifications
                </span>
                <span>
                  <span>
                    <CheckSvg />
                  </span>
                  Guaranteed Placement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <EnrollmentModal
      isOpen={isEnrollmentOpen}
      onHide={() => setIsEnrollmentOpen(false)}
    />
    </>
  );
}
