'use client';
import { useEffect } from 'react';
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";
import FooterTwo from "@/components/footer/footer-two";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy - CCGE | Corporate Commerce Global Education";
  }, []);

  return (
    <>
      <BreadcrumbOne 
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we protect your information."
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
                  <strong style={{ color: 'var(--tp-heading-2)' }}>Effective Date:</strong> January 2025
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6c757d' }}>
                  We are committed to protecting your personal information and your right to privacy.
                </p>
              </div>

              {/* Introduction */}
              <div style={{ marginBottom: '50px' }}>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '20px' }}>
                  Welcome to <strong style={{ color: 'var(--brand-blue-600)' }}>Corporate Commerce Global Education (CCGE)</strong>! 
                  We respect your privacy and are committed to protecting the personal information you share with us. 
                  This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website{' '}
                  <a href="https://corporatecommerce.in" style={{ color: 'var(--brand-blue-600)', textDecoration: 'underline' }}>
                    corporatecommerce.in
                  </a>{' '}
                  or engage with our services.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '20px' }}>
                  By using our website and services, you agree to the terms outlined in this policy.
                </p>
              </div>

              {/* Quick Navigation - Hick's Law */}
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
                    { id: 'collect', title: 'Information We Collect' },
                    { id: 'use', title: 'How We Use Your Data' },
                    { id: 'payment', title: 'Payment Information' },
                    { id: 'sharing', title: 'Sharing Your Information' },
                    { id: 'security', title: 'Data Security' },
                    { id: 'rights', title: 'Your Rights' },
                    { id: 'cookies', title: 'Cookies & Tracking' },
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

              {/* Section 1: Information We Collect - Law of Common Region */}
              <div id="collect" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  1. Information We Collect
                </h3>
                
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef', marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    1.1 Personal Information
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We collect personal information that you voluntarily provide when you:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Fill out enrollment or contact forms</li>
                    <li style={{ marginBottom: '10px' }}>Register for courses or create an account</li>
                    <li style={{ marginBottom: '10px' }}>Make a payment or transaction</li>
                    <li style={{ marginBottom: '10px' }}>Subscribe to newsletters or communications</li>
                    <li style={{ marginBottom: '10px' }}>Contact us via email, phone, or chat</li>
                  </ul>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    This information may include:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    {[
                      { icon: '👤', items: ['Full Name', 'Date of Birth', 'Gender'] },
                      { icon: '📧', items: ['Email Address', 'Phone Number', 'WhatsApp Number'] },
                      { icon: '🏠', items: ['Mailing Address', 'City, State, Pincode', 'Country'] },
                      { icon: '🎓', items: ['Educational Background', 'College/University', 'Field of Study'] },
                      { icon: '💼', items: ['Current Occupation', 'Company Name', 'Work Experience'] },
                      { icon: '📝', items: ['Course Preferences', 'Enrollment Details', 'Learning Goals'] },
                    ].map((group, idx) => (
                      <div key={idx} style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '1px solid #e9ecef'
                      }}>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>{group.icon}</div>
                        <ul style={{ fontSize: '14px', color: '#5a5a5a', paddingLeft: '20px', margin: 0 }}>
                          {group.items.map((item, i) => (
                            <li key={i} style={{ marginBottom: '5px' }}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef', marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    1.2 Usage Data
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We automatically collect certain information when you visit our website, including:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>IP address and browser type</li>
                    <li style={{ marginBottom: '10px' }}>Device information and operating system</li>
                    <li style={{ marginBottom: '10px' }}>Pages visited and time spent on site</li>
                    <li style={{ marginBottom: '10px' }}>Referring/exit pages and URLs</li>
                    <li style={{ marginBottom: '10px' }}>Date and time of visit</li>
                    <li style={{ marginBottom: '10px' }}>Clickstream data and navigation patterns</li>
                  </ul>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginTop: '15px' }}>
                    This information helps us understand how visitors use our site, improve user experience, and optimize our services.
                  </p>
                </div>

                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    1.3 Cookies and Tracking Technologies
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We use cookies and similar tracking technologies to enhance your user experience, monitor website performance, 
                    and tailor content to your preferences. You can control the use of cookies through your browser settings.
                  </p>
                </div>
              </div>

              {/* Section 2: How We Use Your Information */}
              <div id="use" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  2. How We Use Your Information
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We may use the information we collect in the following ways:
                  </p>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {[
                      { icon: '✉️', title: 'Communication', desc: 'To respond to your enquiries, service requests, and support needs efficiently' },
                      { icon: '🎨', title: 'Personalization', desc: 'To personalize your experience and deliver relevant content and course recommendations' },
                      { icon: '💳', title: 'Transactions', desc: 'To process enrollments, payments, and communicate important service-related information' },
                      { icon: '📊', title: 'Analytics', desc: 'To analyze website traffic, improve site design, features, and usability' },
                      { icon: '📢', title: 'Marketing', desc: 'To send newsletters, promotions, or other marketing communications (if opted in)' },
                      { icon: '🎓', title: 'Course Delivery', desc: 'To provide course access, study materials, and learning management services' },
                      { icon: '💼', title: 'Placement Support', desc: 'To facilitate career guidance, job placements, and connect with hiring partners' },
                      { icon: '⚖️', title: 'Legal Compliance', desc: 'To comply with applicable laws, regulations, and protect our legal interests' },
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        background: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid #e9ecef',
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'start'
                      }}>
                        <div style={{ fontSize: '28px', flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <h5 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--tp-heading-2)' }}>
                            {item.title}
                          </h5>
                          <p style={{ fontSize: '14px', color: '#5a5a5a', margin: 0, lineHeight: '1.6' }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Information Security */}
              <div id="payment" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  3. Payment Information & Security
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)' }}>
                    3.1 Payment Processing
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    All payment transactions are processed through <strong>Razorpay</strong>, a PCI DSS Level 1 certified payment gateway. 
                    We do not store your complete credit/debit card details, CVV, or banking passwords on our servers.
                  </p>

                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)', marginTop: '25px' }}>
                    3.2 Information Collected During Payment
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    When you make a payment, we and our payment processor collect:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Payment method (Card, UPI, Net Banking, Wallet)</li>
                    <li style={{ marginBottom: '10px' }}>Transaction ID and payment status</li>
                    <li style={{ marginBottom: '10px' }}>Last 4 digits of card (for your reference only)</li>
                    <li style={{ marginBottom: '10px' }}>Billing information (name, email, phone)</li>
                    <li style={{ marginBottom: '10px' }}>Transaction amount and date</li>
                  </ul>

                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--tp-heading-2)', marginTop: '25px' }}>
                    3.3 Payment Data Retention
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We retain payment transaction records for:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>Account management and billing purposes</li>
                    <li style={{ marginBottom: '10px' }}>Legal and regulatory compliance</li>
                    <li style={{ marginBottom: '10px' }}>Dispute resolution and refund processing</li>
                    <li style={{ marginBottom: '10px' }}>Fraud prevention and financial audits</li>
                  </ul>

                  <div style={{
                    background: '#d1ecf1',
                    padding: '20px',
                    borderRadius: '10px',
                    marginTop: '20px',
                    border: '1px solid #bee5eb'
                  }}>
                    <h5 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#0c5460' }}>
                      🔒 Your Payment Security is Our Priority
                    </h5>
                    <ul style={{ fontSize: '14px', color: '#0c5460', paddingLeft: '20px', margin: 0 }}>
                      <li style={{ marginBottom: '8px' }}>256-bit SSL encryption for all transactions</li>
                      <li style={{ marginBottom: '8px' }}>PCI DSS compliant payment processing</li>
                      <li style={{ marginBottom: '8px' }}>Two-factor authentication for sensitive operations</li>
                      <li style={{ marginBottom: '0' }}>Regular security audits and monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4: Sharing Your Information */}
              <div id="sharing" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  4. Sharing Your Information
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <div style={{
                    background: '#fff3cd',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #ffc107'
                  }}>
                    <p style={{ fontSize: '15px', color: '#856404', margin: 0, fontWeight: '600' }}>
                      <strong>We do not sell or rent your personal data to third parties.</strong>
                    </p>
                  </div>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We may share your information only in the following situations:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>Service Providers:</strong> With third-party vendors, contractors, or service providers who perform services 
                      on our behalf (e.g., payment processing, email services, analytics, LMS hosting) under strict confidentiality agreements
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>Placement Partners:</strong> With hiring companies and recruitment partners (only with your consent) 
                      for job placement and career opportunities
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>Legal Requirements:</strong> When required by law, court order, legal proceedings, or to protect our legal rights and safety
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets, 
                      in which case you will be notified of any change in data ownership or usage
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>With Your Consent:</strong> For any other purpose with your explicit consent
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 5: Data Security */}
              <div id="security" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  5. Data Security
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '20px' }}>
                    We implement a comprehensive range of security measures to maintain the safety of your personal information:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                    {[
                      { icon: '🔐', title: 'Encryption', desc: 'SSL/TLS encryption for data transmission' },
                      { icon: '🛡️', title: 'Firewalls', desc: 'Advanced firewall protection' },
                      { icon: '👮', title: 'Access Control', desc: 'Strict access controls and authentication' },
                      { icon: '📹', title: 'Monitoring', desc: '24/7 security monitoring' },
                      { icon: '💾', title: 'Backups', desc: 'Regular data backups' },
                      { icon: '🔄', title: 'Updates', desc: 'Regular security updates and patches' },
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '1px solid #e9ecef',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</div>
                        <h5 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '5px', color: 'var(--tp-heading-2)' }}>
                          {item.title}
                        </h5>
                        <p style={{ fontSize: '13px', color: '#5a5a5a', margin: 0 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    background: '#f8d7da',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    border: '1px solid #f5c6cb'
                  }}>
                    <p style={{ fontSize: '14px', color: '#721c24', margin: 0 }}>
                      <strong>⚠️ Important:</strong> While we strive to use commercially acceptable means to protect your information, 
                      no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6: Your Rights */}
              <div id="rights" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  6. Your Rights and Choices
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '20px' }}>
                    As a user, you have the following rights regarding your personal data:
                  </p>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {[
                      { icon: '👁️', title: 'Right to Access', desc: 'Request access to the personal data we hold about you' },
                      { icon: '✏️', title: 'Right to Correction', desc: 'Ask us to correct, update, or complete your information' },
                      { icon: '🗑️', title: 'Right to Deletion', desc: 'Request deletion of your personal data (subject to legal requirements)' },
                      { icon: '⛔', title: 'Right to Object', desc: 'Withdraw consent or object to certain types of processing' },
                      { icon: '📧', title: 'Right to Opt-Out', desc: 'Unsubscribe from marketing communications at any time' },
                      { icon: '📦', title: 'Right to Portability', desc: 'Request a copy of your data in a structured format' },
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        background: '#f8f9fa',
                        padding: '18px',
                        borderRadius: '10px',
                        border: '1px solid #e9ecef',
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'start'
                      }}>
                        <div style={{ fontSize: '28px', flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <h5 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: 'var(--tp-heading-2)' }}>
                            {item.title}
                          </h5>
                          <p style={{ fontSize: '14px', color: '#5a5a5a', margin: 0 }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginTop: '20px' }}>
                    To exercise any of these rights, please contact us at{' '}
                    <a href="mailto:info@ccge.in" style={{ color: 'var(--brand-blue-600)', textDecoration: 'underline' }}>
                      info@ccge.in
                    </a>. We will respond to your request within 30 days.
                  </p>
                </div>
              </div>

              {/* Section 7: Cookies Details */}
              <div id="cookies" style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  7. Cookies & Tracking Technologies
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '20px' }}>
                    We use various types of cookies and tracking technologies:
                  </p>
                  <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
                    {[
                      { type: 'Essential Cookies', desc: 'Required for basic website functionality and security', required: true },
                      { type: 'Performance Cookies', desc: 'Help us understand how you use our site and improve performance', required: false },
                      { type: 'Functionality Cookies', desc: 'Remember your preferences and personalize your experience', required: false },
                      { type: 'Analytics Cookies', desc: 'Collect information about site usage and visitor patterns', required: false },
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        background: '#f8f9fa',
                        padding: '15px 20px',
                        borderRadius: '10px',
                        border: '1px solid #e9ecef'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <h5 style={{ fontSize: '15px', fontWeight: '600', margin: 0, color: 'var(--tp-heading-2)' }}>
                            {item.type}
                          </h5>
                          {item.required && (
                            <span style={{
                              fontSize: '11px',
                              background: 'var(--brand-blue-600)',
                              color: 'white',
                              padding: '3px 10px',
                              borderRadius: '12px',
                              fontWeight: '600'
                            }}>
                              Required
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '14px', color: '#5a5a5a', margin: 0 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a' }}>
                    You can control and manage cookies through your browser settings. However, disabling certain cookies may affect 
                    website functionality and your user experience.
                  </p>
                </div>
              </div>

              {/* Additional Sections */}
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
                    Our website may contain links to other websites for your convenience (certification bodies, industry resources, etc.). 
                    Please note that we do not control these websites and are not responsible for their content or privacy practices. 
                    We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  9. Children&apos;s Privacy
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    Our services are intended for adults and individuals aged 18 years and above. We do not knowingly collect 
                    personal information from minors under 18. If we become aware that we have inadvertently received information 
                    from a child, we will delete it immediately.
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  10. Data Retention
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We retain your personal information for as long as necessary to:
                  </p>
                  <ul style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>Provide you with our services and support</li>
                    <li style={{ marginBottom: '10px' }}>Comply with legal, regulatory, or contractual obligations</li>
                    <li style={{ marginBottom: '10px' }}>Resolve disputes and enforce agreements</li>
                    <li style={{ marginBottom: '10px' }}>Maintain business records and analytics</li>
                  </ul>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginTop: '15px' }}>
                    After course completion, we may retain your information for up to 7 years for legal and audit purposes.
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: 'var(--tp-heading-2)',
                  paddingBottom: '15px',
                  borderBottom: '3px solid var(--brand-blue-600)'
                }}>
                  11. Policy Updates
                </h3>
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #e9ecef' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    We may modify this Privacy Policy from time to time to reflect changes in our practices, legal obligations, 
                    or business requirements. When we make changes, we will revise the &quot;Effective Date&quot; at the top of the policy 
                    and post the updated version on this page.
                  </p>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#5a5a5a', marginBottom: '15px' }}>
                    For significant changes, we will notify you via email or prominent notice on our website. 
                    We encourage you to review this page periodically to stay informed.
                  </p>
                </div>
              </div>

              {/* Contact Section - Fitts's Law */}
              <div id="contact" style={{ scrollMarginTop: '100px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--brand-blue-600) 0%, #1e3a8a 100%)',
                  padding: '40px',
                  borderRadius: '16px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '15px', color: 'white' }}>
                    Have Privacy Questions?
                  </h3>
                  <p style={{ fontSize: '16px', marginBottom: '30px', color: 'white', opacity: 0.95 }}>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, 
                    please don&apos;t hesitate to contact us.
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

              {/* Trust Notice */}
              <div style={{
                background: '#e7f3ff',
                padding: '25px 30px',
                borderRadius: '12px',
                marginTop: '50px',
                border: '2px solid var(--brand-blue-600)'
              }}>
                <p style={{ fontSize: '15px', color: 'var(--tp-grey-4)', margin: 0, textAlign: 'center' }}>
                  <strong>We appreciate your trust in us and are committed to ensuring that your privacy is respected and protected at all times.</strong>
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
