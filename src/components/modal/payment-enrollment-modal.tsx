'use client';
import React, { useState } from 'react';
import { ICourseDT } from '@/types/course-d-t';

type PaymentOption = {
  months: number;
  amount: number;
  label?: string;
  discount?: number;
};

type IProps = {
  isOpen: boolean;
  onHide: () => void;
  course: ICourseDT;
  selectedPaymentOption: PaymentOption;
  onSubmitSuccess: (enrollmentId: string) => void;
};

type FormData = {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  
  // Contact Details
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  whatsappSame: boolean;
  
  // Educational Background
  qualification: string;
  fieldOfStudy: string;
  collegeName: string;
  yearOfCompletion: string;
  
  // Professional Information
  occupation: string;
  companyName: string;
  yearsOfExperience: string;
  
  // Course Specific
  preferredStartDate: string;
  
  // Terms
  acceptTerms: boolean;
};

export default function PaymentEnrollmentModal({
  isOpen,
  onHide,
  course,
  selectedPaymentOption,
  onSubmitSuccess
}: IProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    whatsappSame: true,
    qualification: '',
    fieldOfStudy: '',
    collegeName: '',
    yearOfCompletion: '',
    occupation: 'Student',
    companyName: '',
    yearsOfExperience: '0',
    preferredStartDate: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College/University name is required';
    if (!formData.yearOfCompletion) newErrors.yearOfCompletion = 'Year of completion is required';
    if (!formData.preferredStartDate) newErrors.preferredStartDate = 'Preferred start date is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Google Sheets
      const response = await fetch('/api/enrollment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          courseName: course.title,
          courseId: course.id,
          paymentPlan: selectedPaymentOption.label || `${selectedPaymentOption.months} Installment(s)`,
          amount: selectedPaymentOption.amount,
          totalAmount: course.price,
          paymentStatus: 'Pending Payment'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save enrollment');
      }

      // Success - call parent with enrollment ID
      onSubmitSuccess(data.enrollmentId);
      
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to save enrollment details. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
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
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={(e) => e.target === e.currentTarget && onHide()}
    >
      <div 
        className="payment-enrollment-modal"
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '30px',
          borderBottom: '2px solid #e9ecef',
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 10,
          borderRadius: '16px 16px 0 0'
        }}>
          <button
            onClick={onHide}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
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
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--tp-heading-2)',
            marginBottom: '10px'
          }}>
            Complete Your Enrollment
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6c757d',
            marginBottom: '15px'
          }}>
            Fill in your details to proceed with payment
          </p>
          
          {/* Course Summary */}
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '15px',
            borderRadius: '10px',
            marginTop: '15px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>Course:</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--tp-heading-2)' }}>
                {course.title}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>Payment Plan:</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--brand-blue-600)' }}>
                {selectedPaymentOption.label || `${selectedPaymentOption.months} Installment(s)`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>Amount to Pay Now:</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-blue-600)' }}>
                ₹{selectedPaymentOption.amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
          {/* Personal Information */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--tp-heading-2)',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid var(--brand-blue-600)'
            }}>
              Personal Information
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Full Name (as per ID) <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.fullName ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Email Address <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.email ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Phone Number <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.phone ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="9876543210"
                />
                {errors.phone && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Date of Birth <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.dateOfBirth ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                {errors.dateOfBirth && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.dateOfBirth}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.whatsappSame}
                  onChange={(e) => handleInputChange('whatsappSame', e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                <span>This number is available on WhatsApp</span>
              </label>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--tp-heading-2)',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid var(--brand-blue-600)'
            }}>
              Contact Details
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Full Address <span style={{ color: 'red' }}>*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.address ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px',
                    minHeight: '80px',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Enter your complete address"
                />
                {errors.address && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.address}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  City <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.city ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="Your city"
                />
                {errors.city && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.city}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  State <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.state ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="Your state"
                />
                {errors.state && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.state}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Pincode <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.pincode ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="500001"
                />
                {errors.pincode && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.pincode}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Country <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Educational Background */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--tp-heading-2)',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid var(--brand-blue-600)'
            }}>
              Educational Background
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Highest Qualification <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.qualification ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select Qualification</option>
                  <option value="12th">12th Standard</option>
                  <option value="Diploma">Diploma</option>
                  <option value="B.Com">B.Com</option>
                  <option value="BBA">BBA</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Com">M.Com</option>
                  <option value="MBA">MBA</option>
                  <option value="CA">CA</option>
                  <option value="CS">CS</option>
                  <option value="CMA">CMA</option>
                  <option value="Other">Other</option>
                </select>
                {errors.qualification && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.qualification}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Field of Study <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.fieldOfStudy ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="Commerce, Finance, etc."
                />
                {errors.fieldOfStudy && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.fieldOfStudy}
                  </span>
                )}
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  College/University Name <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.collegeName}
                  onChange={(e) => handleInputChange('collegeName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.collegeName ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="Enter your college/university name"
                />
                {errors.collegeName && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.collegeName}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Year of Completion <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="number"
                  value={formData.yearOfCompletion}
                  onChange={(e) => handleInputChange('yearOfCompletion', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.yearOfCompletion ? '2px solid #dc3545' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="2024"
                  min="1950"
                  max="2030"
                />
                {errors.yearOfCompletion && (
                  <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                    {errors.yearOfCompletion}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--tp-heading-2)',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid var(--brand-blue-600)'
            }}>
              Professional Information
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Current Occupation <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Student">Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Company Name {formData.occupation === 'Working Professional' && <span style={{ color: 'red' }}>*</span>}
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="N/A if not applicable"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  min="0"
                  max="50"
                />
              </div>
            </div>
          </div>

          {/* Course Specific */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--tp-heading-2)',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid var(--brand-blue-600)'
            }}>
              Course Preferences
            </h4>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                Preferred Start Date <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="date"
                value={formData.preferredStartDate}
                onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.preferredStartDate ? '2px solid #dc3545' : '1px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.preferredStartDate && (
                <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                  {errors.preferredStartDate}
                </span>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'start', fontSize: '14px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                style={{ marginRight: '10px', marginTop: '3px', minWidth: '18px', height: '18px' }}
              />
              <span>
                I accept the <a href="/terms" target="_blank" style={{ color: 'var(--brand-blue-600)', textDecoration: 'underline' }}>Terms & Conditions</a> and <a href="/privacy-policy" target="_blank" style={{ color: 'var(--brand-blue-600)', textDecoration: 'underline' }}>Privacy Policy</a>. I understand that the information provided will be used for enrollment purposes. <span style={{ color: 'red' }}>*</span>
              </span>
            </label>
            {errors.acceptTerms && (
              <span className="error-message" style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                {errors.acceptTerms}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end',
            paddingTop: '20px',
            borderTop: '2px solid #e9ecef'
          }}>
            <button
              type="button"
              onClick={onHide}
              disabled={isSubmitting}
              style={{
                padding: '14px 30px',
                background: 'white',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                color: '#6c757d',
                opacity: isSubmitting ? 0.5 : 1
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '14px 40px',
                background: isSubmitting ? '#95a5a6' : 'var(--brand-blue-600)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                color: 'white',
                boxShadow: '0 4px 12px rgba(47, 118, 183, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              {isSubmitting ? 'Processing...' : 'Submit & Proceed to Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

