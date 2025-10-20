'use client';
import React, { useState } from "react";
import { CloseThreeSvg } from "../svg";

type IProps = {
   isOpen: boolean;
   onHide: () => void;
};

const courses = [
  "ACCA Course",
  "CFA Course", 
  "CMA Course",
  "CPA Course",
  "FRM Course",
  "ESG Course",
  "EA Course",
  "Investment Banking Operations",
  "Global Investment Banking",
  "DipIFRS Course",
  "UK Taxation & Accounting"
];

export default function EnrollmentModal({ isOpen, onHide }: IProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to Google Forms
      const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeK6uLwLrniG_JjHpcHcy8zURJ7kyUI73JVXFrdoO0m0Vs76A/formResponse";
      
      const googleFormData = new FormData();
      googleFormData.append("entry.722333845", formData.name); // Name
      googleFormData.append("entry.1975402017", formData.email); // Email
      googleFormData.append("entry.1789869", formData.phone); // Phone
      googleFormData.append("entry.1909450583", formData.course); // Course
      googleFormData.append("entry.1394785474", formData.message || ""); // Message

      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });

      // Send WhatsApp message
      const whatsappMessage = `🎓 *New Enrollment Request*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Course Interested:* ${formData.course}
*Message:* ${formData.message || 'No additional message'}

Thank you for your interest in our courses!`;

      const whatsappUrl = `https://wa.me/919666660713?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      setSubmitStatus('success');
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onHide();
        setSubmitStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="tp-modal-area">
        <div className="tp-modal-wrapper">
          <div className="tp-modal-content">
            <div className="tp-modal-close">
              <button className="tp-modal-close-btn" onClick={onHide}>
                <CloseThreeSvg clr="#57595F" />
              </button>
            </div>
            
            <div className="tp-modal-body">
              <div className="tp-modal-title">
                <h3>Enroll Now</h3>
                <p>Fill out the form below and we&apos;ll get back to you soon!</p>
              </div>

              <form onSubmit={handleSubmit} className="tp-modal-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="tp-modal-input">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-modal-input">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-modal-input">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-modal-input">
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Course *</option>
                        {courses.map((course, index) => (
                          <option key={index} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="tp-modal-input">
                      <textarea
                        name="message"
                        placeholder="Additional Notes (Optional)"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="tp-modal-success">
                    <p>✅ Thank you! Your enrollment request has been submitted successfully.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="tp-modal-error">
                    <p>❌ There was an error submitting your request. Please try again.</p>
                  </div>
                )}

                <div className="tp-modal-btn">
                  <button 
                    type="submit" 
                    className="tp-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="body-overlay opened" onClick={onHide}></div>
    </>
  );
}
