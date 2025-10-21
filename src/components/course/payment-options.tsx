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
  course: ICourseDT;
  onPaymentSelect: (option: PaymentOption) => void;
};

export default function PaymentOptions({ course, onPaymentSelect }: IProps) {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const { installmentOptions, price } = course;

  if (!installmentOptions || installmentOptions.length === 0) {
    return null;
  }

  const handleOptionSelect = (index: number, option: PaymentOption) => {
    setSelectedOption(index);
    onPaymentSelect(option);
  };

  return (
    <div style={{
      marginBottom: '25px',
      padding: '20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '12px',
      border: '2px solid #e0e0e0'
    }}>
      {/* Header - Law of Proximity & Gestalt */}
      <div style={{marginBottom: '20px', textAlign: 'center'}}>
        <h5 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: 'var(--tp-heading-2)',
          marginBottom: '8px',
          letterSpacing: '0.3px'
        }}>
          💰 Choose Your Payment Plan
        </h5>
        <p style={{
          fontSize: '13px',
          color: '#6c757d',
          margin: 0
        }}>
          Pay now or split into 2 installments
        </p>
      </div>

      {/* Payment Options - Miller's Law (7±2 items), Law of Similarity */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {installmentOptions.map((option, index) => {
          const isSelected = selectedOption === index;
          const isFullPayment = option.discount && option.discount > 0;
          
          return (
            <div
              key={index}
              onClick={() => handleOptionSelect(index, option)}
              style={{
                position: 'relative',
                padding: '18px 20px',
                background: isSelected ? 'white' : '#ffffff',
                border: isSelected ? '2px solid var(--brand-blue-600)' : '2px solid #dee2e6',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.25s ease', // Doherty Threshold (<400ms)
                boxShadow: isSelected 
                  ? '0 8px 24px rgba(47, 118, 183, 0.2)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.06)',
                transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--brand-blue-400)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(47, 118, 183, 0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#dee2e6';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                }
              }}
            >
              {/* Von Restorff Effect - Highlight best deal */}
              {isFullPayment && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#FFC221',
                  color: '#1E1E2F',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px rgba(255, 194, 33, 0.4)',
                  zIndex: 10
                }}>
                  SAVE ₹{option.discount?.toLocaleString('en-IN')}
                </div>
              )}

              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                {/* Radio Button - Fitts's Law (larger target) */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: isSelected ? '7px solid var(--brand-blue-600)' : '2px solid #ced4da',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }} />

                <div style={{flex: 1, paddingRight: isFullPayment ? '100px' : '0'}}>
                  {/* Law of Continuity & Closure */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: isSelected ? 'var(--brand-blue-600)' : 'var(--tp-heading-2)',
                        display: 'block',
                        marginBottom: '4px'
                      }}>
                        {option.label || `${option.months} Installment${option.months > 1 ? 's' : ''}`}
                      </span>
                      {option.months > 1 && (
                        <span style={{
                          fontSize: '13px',
                          color: '#6c757d'
                        }}>
                          {course.id === 7 ? 'Pay ₹25,000 now • ₹20,000 next month' : 
                           course.id === 11 ? 'Pay ₹15,000 now • ₹10,000 next month' : ''}
                        </span>
                      )}
                    </div>
                    
                    {/* Aesthetic-Usability Effect - Clear pricing */}
                    <div style={{textAlign: 'right'}}>
                      {isFullPayment && option.discount ? (
                        <>
                          <div style={{
                            fontSize: '14px',
                            color: '#6c757d',
                            textDecoration: 'line-through',
                            marginBottom: '2px'
                          }}>
                            ₹{price?.toLocaleString('en-IN')}
                          </div>
                          <div style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: 'var(--brand-blue-600)'
                          }}>
                            ₹{option.amount.toLocaleString('en-IN')}
                          </div>
                        </>
                      ) : option.months > 1 ? (
                        <div style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: isSelected ? 'var(--brand-blue-600)' : 'var(--tp-heading-2)'
                        }}>
                          ₹{option.amount.toLocaleString('en-IN')} now
                        </div>
                      ) : (
                        <div style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: isSelected ? 'var(--brand-blue-600)' : 'var(--tp-heading-2)'
                        }}>
                          ₹{option.amount.toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Summary - Law of Common Region */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{fontSize: '14px', fontWeight: '600', color: '#6c757d'}}>
            Total Course Fee:
          </span>
          <span style={{fontSize: '22px', fontWeight: '700', color: 'var(--brand-blue-600)'}}>
            ₹{price?.toLocaleString('en-IN')}
          </span>
        </div>
        {installmentOptions[selectedOption]?.discount && (
          <div style={{
            marginTop: '10px',
            padding: '8px',
            background: '#fff3cd',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#856404',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            🎉 You save ₹{installmentOptions[selectedOption].discount?.toLocaleString('en-IN')} with full payment!
          </div>
        )}
      </div>

      {/* Installment Explanation */}
      {installmentOptions[selectedOption]?.months > 1 && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          background: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #bbdefb'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#1565c0',
            fontWeight: '600',
            marginBottom: '6px'
          }}>
            📅 Installment Schedule:
          </div>
          <div style={{
            fontSize: '12px',
            color: '#1976d2',
            lineHeight: '1.4'
          }}>
            {course.id === 7 ? (
              <>• <strong>Today:</strong> Pay ₹25,000 (First Installment)<br/>
              • <strong>Next Month:</strong> Pay ₹20,000 (Second Installment)</>
            ) : course.id === 11 ? (
              <>• <strong>Today:</strong> Pay ₹15,000 (First Installment)<br/>
              • <strong>Next Month:</strong> Pay ₹10,000 (Second Installment)</>
            ) : ''}
          </div>
        </div>
      )}
    </div>
  );
}

