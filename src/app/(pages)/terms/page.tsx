'use client';
import { useEffect } from 'react';
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";
import FooterTwo from "@/components/footer/footer-two";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions - CCGE | Corporate Commerce Global Education";
  }, []);

  return (
    <>
      <BreadcrumbOne 
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services"
      />

      <section className="tp-privacy-area pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              {/* Last Updated - Von Restorff Effect */}
              <div style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                padding: '20px 30px',
                borderRadius: '12px',
                marginBottom: '40px',
                borderLeft: '4px solid var(--brand-blue-600)'
              }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                  <strong style={{ color: 'var(--tp-heading-2)' }}>Last Updated:</strong> January 2025
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6c757d' }}>
                  By accessing or using our website and services, you agree to be bound by these Terms and Conditions.
                </p>
              </div>

              {/* Introduction */}
              <div style={{ marginBottom: '50px' }}>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '20px' }}>
                  Welcome to <strong style={{ color: 'var(--brand-blue-600)' }}>Corporate Commerce Global Education (CCGE)</strong>! 
                  Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using our website{' '}
                  <a href="https://corporatecommerce.in" style={{ color: 'var(--brand-blue-600)', textDecoration: 'underline' }}>
                    corporatecommerce.in
                  </a>. By accessing or using our site, you agree to comply with and be bound by these Terms. 
                  If you do not agree with any part of the terms, you may not access the website or use our services.
                </p>
              </div>

              {/* Quick Navigation - Hick's Law (reduce decision time) */}
              <div style={{
                background: '#fff',
                padding: '25px 30px',
                borderRadius: '12px',
                marginBottom: '50px',
                border: '2px solid #e9ecef',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'var(--tp-heading-2)' }}>
                  📑 Quick Navigation
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {[
                    { id: 'use', title: 'Use of Website' },
                    { id: 'enrollment', title: 'Course Enrollment' },
                    { id: 'payment', title: 'Payment Terms' },
                    { id: 'refund', title: 'Refund Policy' },
                    { id: 'services', title: 'Services Provided' },
                    { id: 'ip', title: 'Intellectual Property' },
                    { id: 'liability', title: 'Limitation of Liability' },
                    { id: 'contact', title: 'Contact Us' },
                  ].map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`}
                      style={{
                        padding: '10px 15px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: 'var(--brand-blue-600)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        textAlign: 'center',
                        border: '1px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--brand-blue-600)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = 'var(--brand-blue-600)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f8f9fa';
                        e.currentTarget.style.color = 'var(--brand-blue-600)';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Section 1: Use of Website - Law of Common Region */}
              <div id="use" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  1. Use of the Website
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    You agree to use our website only for lawful purposes and in a way that does not:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>Infringe the rights of others or restrict their use of the website</li>
                    <li style={{ marginBottom: '10px' }}>Violate any applicable laws or regulations</li>
                    <li style={{ marginBottom: '10px' }}>Transmit harmful, offensive, or inappropriate content</li>
                    <li style={{ marginBottom: '10px' }}>Attempt to gain unauthorized access to our systems or networks</li>
                  </ul>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginTop: '15px' }}>
                    Any unauthorized use may result in termination of access and legal action.
                  </p>
                </div>
              </div>

              {/* Section 2: Course Enrollment & Registration */}
              <div id="enrollment" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  2. Course Enrollment & Registration
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    When enrolling in any CCGE course, you agree that:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>All information provided during enrollment is accurate, complete, and up-to-date</li>
                    <li style={{ marginBottom: '10px' }}>You are legally capable of entering into binding contracts</li>
                    <li style={{ marginBottom: '10px' }}>You meet the eligibility criteria for the selected course</li>
                    <li style={{ marginBottom: '10px' }}>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li style={{ marginBottom: '10px' }}>You will notify us immediately of any unauthorized access to your account</li>
                  </ul>
                  <div style={{
                    background: '#fff3cd',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    border: '1px solid #ffc107'
                  }}>
                    <p style={{ fontSize: '14px', color: '#856404', margin: 0 }}>
                      <strong>⚠️ Important:</strong> CCGE reserves the right to verify your credentials and cancel enrollment if any information is found to be false or misleading.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Terms - Aesthetic-Usability Effect */}
              <div id="payment" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  3. Payment Terms
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    3.1 Payment Methods
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We accept payments through our secure payment gateway powered by Razorpay, including:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '25px' }}>
                    <li style={{ marginBottom: '10px' }}>Credit Cards (Visa, Mastercard, American Express, etc.)</li>
                    <li style={{ marginBottom: '10px' }}>Debit Cards</li>
                    <li style={{ marginBottom: '10px' }}>Net Banking</li>
                    <li style={{ marginBottom: '10px' }}>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                    <li style={{ marginBottom: '10px' }}>Digital Wallets</li>
                  </ul>

                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    3.2 Payment Plans
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    For select courses, we offer flexible payment options:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '25px' }}>
                    <li style={{ marginBottom: '10px' }}><strong>Full Payment:</strong> Pay the complete course fee upfront and save on total cost</li>
                    <li style={{ marginBottom: '10px' }}><strong>Installment Plan:</strong> Split payments into 2 installments (where available)</li>
                  </ul>

                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    3.3 Installment Terms
                  </h4>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '25px' }}>
                    <li style={{ marginBottom: '10px' }}>First installment must be paid at the time of enrollment</li>
                    <li style={{ marginBottom: '10px' }}>Second installment is due within 30 days of enrollment</li>
                    <li style={{ marginBottom: '10px' }}>Course access may be restricted if installments are not paid on time</li>
                    <li style={{ marginBottom: '10px' }}>No certificate will be issued until full payment is received</li>
                  </ul>

                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    3.4 Pricing & Currency
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    All prices are listed in Indian Rupees (₹ INR) and include applicable taxes. Course fees are subject to change without prior notice. 
                    However, students who have already enrolled will not be affected by price changes.
                  </p>

                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    3.5 Payment Confirmation
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    Upon successful payment, you will receive:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '25px' }}>
                    <li style={{ marginBottom: '10px' }}>Payment receipt from Razorpay via email</li>
                    <li style={{ marginBottom: '10px' }}>Enrollment confirmation from CCGE</li>
                    <li style={{ marginBottom: '10px' }}>Course access details within 24-48 hours</li>
                    <li style={{ marginBottom: '10px' }}>Unique enrollment ID for reference</li>
                  </ul>

                  <div style={{
                    background: '#d1ecf1',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    border: '1px solid #bee5eb'
                  }}>
                    <p style={{ fontSize: '14px', color: '#0c5460', margin: 0 }}>
                      <strong>💳 Secure Payments:</strong> All transactions are processed through Razorpay&apos;s PCI DSS compliant payment gateway. 
                      CCGE does not store your card or banking details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4: Refund Policy */}
              <div id="refund" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  4. Refund & Cancellation Policy
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    4.1 Cancellation by Student
                  </h4>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '25px' }}>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>Within 7 days of enrollment:</strong> Full refund minus processing fees (3% of total amount)
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>8-14 days after enrollment:</strong> 50% refund of course fee
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>After 14 days:</strong> No refund available
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>After course commencement:</strong> No refund under any circumstances
                    </li>
                  </ul>

                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    4.2 Refund Process
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    To request a refund:
                  </p>
                  <ol style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '25px' }}>
                    <li style={{ marginBottom: '10px' }}>Email us at <a href="mailto:info@ccge.in" style={{ color: 'var(--brand-blue-600)' }}>info@ccge.in</a> with your enrollment ID</li>
                    <li style={{ marginBottom: '10px' }}>Provide reason for cancellation</li>
                    <li style={{ marginBottom: '10px' }}>Refunds will be processed within 7-10 business days</li>
                    <li style={{ marginBottom: '10px' }}>Amount will be credited to original payment method</li>
                  </ol>

                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    4.3 Cancellation by CCGE
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    CCGE reserves the right to cancel a course due to insufficient enrollments or other unforeseen circumstances. 
                    In such cases, students will receive a <strong>full refund</strong> or option to transfer to another batch.
                  </p>
                </div>
              </div>

              {/* Section 5: Services Provided */}
              <div id="services" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  5. Services Provided
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    CCGE provides professional finance and accounting certification courses including:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Live interactive classes and recorded sessions</li>
                    <li style={{ marginBottom: '10px' }}>Study materials, practice questions, and mock exams</li>
                    <li style={{ marginBottom: '10px' }}>Expert faculty support and doubt resolution</li>
                    <li style={{ marginBottom: '10px' }}>Placement assistance and career guidance</li>
                    <li style={{ marginBottom: '10px' }}>LMS (Learning Management System) access</li>
                  </ul>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We reserve the right to modify, suspend, or discontinue any part of the website or services without prior notice. 
                    Course content, schedule, and faculty may be changed at CCGE&apos;s discretion.
                  </p>
                </div>
              </div>

              {/* Section 6: User Submissions */}
              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  6. User Submissions
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    By submitting information through our contact forms, enrollment forms, or other interactive elements, you agree that:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>All information provided is accurate and up-to-date</li>
                    <li style={{ marginBottom: '10px' }}>You are not violating any laws or third-party rights</li>
                    <li style={{ marginBottom: '10px' }}>We may contact you in response to your submission</li>
                    <li style={{ marginBottom: '10px' }}>We may use your feedback to improve our services</li>
                  </ul>
                </div>
              </div>

              {/* Section 7: Intellectual Property */}
              <div id="ip" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  7. Intellectual Property
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    All content on this website, including but not limited to:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Text, graphics, logos, images, and videos</li>
                    <li style={{ marginBottom: '10px' }}>Course materials, study guides, and practice questions</li>
                    <li style={{ marginBottom: '10px' }}>Software, code, and website design</li>
                    <li style={{ marginBottom: '10px' }}>Audio and video recordings of classes</li>
                    <li style={{ marginBottom: '10px' }}>Trademarks and branding</li>
                  </ul>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    is the property of Corporate Commerce Global Education or its licensors and is protected by applicable copyright, 
                    trademark, and intellectual property laws.
                  </p>
                  <div style={{
                    background: '#f8d7da',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    border: '1px solid #f5c6cb'
                  }}>
                    <p style={{ fontSize: '14px', color: '#721c24', margin: 0 }}>
                      <strong>⚠️ Unauthorized Use:</strong> Copying, reproducing, distributing, or sharing course materials 
                      without written permission is strictly prohibited and may result in legal action.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 8: Third-Party Links */}
              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  8. Third-Party Links
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    Our website may include links to external websites (such as payment gateways, certification bodies, etc.) for informational purposes. 
                    We are not responsible for the content, accuracy, or privacy practices of third-party websites, nor do we endorse them. 
                    Use of any linked website is at your own risk.
                  </p>
                </div>
              </div>

              {/* Section 9: Limitation of Liability */}
              <div id="liability" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  9. Limitation of Liability
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    CCGE shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Your use of, or inability to use, our website or services</li>
                    <li style={{ marginBottom: '10px' }}>Errors, omissions, interruptions, or data loss</li>
                    <li style={{ marginBottom: '10px' }}>Unauthorized access to your account or data</li>
                    <li style={{ marginBottom: '10px' }}>Technical issues or system downtime</li>
                    <li style={{ marginBottom: '10px' }}>Actions of third-party service providers</li>
                    <li style={{ marginBottom: '10px' }}>Exam results or certification outcomes</li>
                  </ul>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    While we strive to provide accurate information and quality education, CCGE does not guarantee specific exam results, 
                    job placements, or career outcomes. Success depends on individual effort and circumstances.
                  </p>
                </div>
              </div>

              {/* Section 10: Indemnification */}
              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  10. Indemnification
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    You agree to indemnify, defend, and hold harmless CCGE and its employees, affiliates, and partners from any claims, 
                    damages, liabilities, or expenses (including legal fees) arising from:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>Your use of the website or services</li>
                    <li style={{ marginBottom: '10px' }}>Your violation of these Terms</li>
                    <li style={{ marginBottom: '10px' }}>Infringement of any intellectual property or other rights</li>
                    <li style={{ marginBottom: '10px' }}>Any false or misleading information provided by you</li>
                  </ul>
                </div>
              </div>

              {/* Section 11: Termination */}
              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  11. Termination
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We reserve the right to restrict, suspend, or terminate your access to our website and services at any time, 
                    without notice, if we believe you have:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>Violated these Terms or any applicable laws</li>
                    <li style={{ marginBottom: '10px' }}>Provided false or misleading information</li>
                    <li style={{ marginBottom: '10px' }}>Engaged in fraudulent or illegal activities</li>
                    <li style={{ marginBottom: '10px' }}>Shared course materials without authorization</li>
                    <li style={{ marginBottom: '10px' }}>Failed to make required payments</li>
                  </ul>
                </div>
              </div>

              {/* Section 12: Changes to Terms */}
              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  12. Changes to These Terms
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We may update or modify these Terms at any time without prior notice. Any changes will be posted on this page 
                    with a revised effective date. Continued use of the website constitutes your acceptance of the updated Terms.
                  </p>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We encourage you to review this page periodically to stay informed of any changes.
                  </p>
                </div>
              </div>

              {/* Section 13: Governing Law */}
              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  13. Governing Law & Jurisdiction
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    These Terms and Conditions are governed by and construed in accordance with the <strong>laws of India</strong>. 
                    Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in{' '}
                    <strong>Hyderabad, Telangana</strong>.
                  </p>
                </div>
              </div>

              {/* Contact Section - Fitts's Law (large clickable areas) */}
              <div id="contact" style={{ scrollMarginTop: '100px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--brand-blue-600) 0%, #1e3a8a 100%)',
                  padding: '40px',
                  borderRadius: '16px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '15px', color: 'white' }}>
                    Have Questions About Our Terms?
                  </h3>
                  <p style={{ fontSize: '16px', marginBottom: '30px', color: 'white', opacity: 0.95 }}>
                    If you have any questions or concerns about these Terms and Conditions, please don&apos;t hesitate to reach out.
                  </p>
                  
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    padding: '30px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    marginBottom: '25px'
                  }}>
                    <p style={{ fontSize: '15px', marginBottom: '10px', color: 'white' }}>
                      <strong>Company Name:</strong> Corporate Commerce Global Education
                    </p>
                    <p style={{ fontSize: '15px', marginBottom: '10px', color: 'white' }}>
                      <strong>Website:</strong>{' '}
                      <a href="https://corporatecommerce.in" style={{ color: '#FFC221', textDecoration: 'underline' }}>
                        corporatecommerce.in
                      </a>
                    </p>
                    <p style={{ fontSize: '15px', marginBottom: '10px', color: 'white' }}>
                      <strong>Address:</strong> 8-3-318/11/31, Jayaprakash Nagar, Besides Saradhi Studio, Ameerpet, Hyderabad – 500073
                    </p>
                    <p style={{ fontSize: '15px', marginBottom: '10px', color: 'white' }}>
                      <strong>Phone:</strong>{' '}
                      <a href="tel:+919666660713" style={{ color: '#FFC221' }}>+91 96666 60713</a> /{' '}
                      <a href="tel:+919666660714" style={{ color: '#FFC221' }}>14</a>
                    </p>
                    <p style={{ fontSize: '15px', marginBottom: 0, color: 'white' }}>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:info@ccge.in" style={{ color: '#FFC221' }}>info@ccge.in</a>
                    </p>
                  </div>

                  <a 
                    href="/contact"
                    style={{
                      display: 'inline-block',
                      padding: '15px 40px',
                      background: '#FFC221',
                      color: '#1E1E2F',
                      borderRadius: '50px',
                      fontSize: '16px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 20px rgba(255, 194, 33, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 194, 33, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 194, 33, 0.4)';
                    }}
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Acceptance Notice */}
              <div style={{
                background: '#e7f3ff',
                padding: '25px 30px',
                borderRadius: '12px',
                marginTop: '50px',
                border: '2px solid var(--brand-blue-600)'
              }}>
                <p style={{ fontSize: '15px', color: 'var(--tp-grey-4)', margin: 0, textAlign: 'center' }}>
                  <strong>By using CCGE services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterTwo />
    </>
  );
}

