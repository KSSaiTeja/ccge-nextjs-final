/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/img/logo/CCGE Final Logo.png";

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
  courseName,
}: IProps) {
  if (!isOpen) return null;

  const handleDownloadReceipt = () => {
    // Take screenshot instruction
    alert(
      "Please take a screenshot of this page for your records. You can also find payment details in your email.",
    );
  };

  return (
    <div
      className="payment-success-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "20px",
        backdropFilter: "blur(8px)",
      }}
      onClick={onHide}
    >
      <div
        className="payment-success-modal"
        style={{
          background: "white",
          borderRadius: "24px",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
          position: "relative",
          overflow: "hidden",
          animation: "slideUp 0.4s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Success Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            padding: "30px 25px 25px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "white",
              borderRadius: "50%",
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              animation: "scaleIn 0.5s ease-out",
            }}
          >
            <svg
              width="36"
              height="36"
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

          <h2
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "white",
              marginBottom: "6px",
              letterSpacing: "-0.5px",
            }}
          >
            Payment Successful!
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
            }}
          >
            Enrollment confirmed
          </p>
        </div>

        {/* Compact Content Section */}
        <div style={{ padding: "24px" }}>
          {/* Compact Course Info */}
          <div
            style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: "1px solid #bfdbfe",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#6b7280",
                marginBottom: "4px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Course Enrolled
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "var(--brand-blue-600)",
              }}
            >
              {courseName}
            </div>
          </div>

          {/* Compact Payment Details */}
          <div
            style={{
              background: "#f9fafb",
              padding: "14px",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "600" }}>
                Amount Paid
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#10b981",
                }}
              >
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <div style={{ color: "#9ca3af", marginBottom: "4px", fontSize: "11px" }}>
                Payment ID
              </div>
              <div
                style={{
                  fontWeight: "600",
                  color: "#374151",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  wordBreak: "break-all",
                  background: "white",
                  padding: "8px",
                  borderRadius: "6px",
                }}
              >
                {paymentId}
              </div>
            </div>

            <div>
              <div style={{ color: "#9ca3af", marginBottom: "4px", fontSize: "11px" }}>
                Enrollment ID
              </div>
              <div
                style={{
                  fontWeight: "600",
                  color: "#374151",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  wordBreak: "break-all",
                  background: "white",
                  padding: "8px",
                  borderRadius: "6px",
                }}
              >
                {enrollmentId}
              </div>
            </div>
          </div>

          {/* Screenshot Reminder */}
          <div
            style={{
              background: "#fef3c7",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "16px",
              border: "1px solid #fbbf24",
              fontSize: "12px",
              color: "#78350f",
              display: "flex",
              gap: "10px",
              alignItems: "start",
            }}
          >
            <span style={{ fontSize: "18px", flexShrink: 0 }}>📸</span>
            <div>
              <div style={{ fontWeight: "600", marginBottom: "2px" }}>Save for Your Records</div>
              <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
                Take a screenshot for future reference. Payment details will also be emailed.
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div
            style={{
              background: "#f0fdf4",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
              border: "1px solid #86efac",
              fontSize: "12px",
              color: "#166534",
            }}
          >
            <div style={{ fontWeight: "600", marginBottom: "6px" }}>📧 What&apos;s Next?</div>
            <div style={{ fontSize: "11px", lineHeight: "1.5" }}>
              You&apos;ll receive a confirmation email with course access details within 24-48 hours.
            </div>
          </div>

          {/* Compact Button */}
          <button
            onClick={onHide}
            style={{
              width: "100%",
              padding: "14px",
              background: "var(--brand-blue-600)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 12px rgba(47, 118, 183, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--brand-blue-700)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(47, 118, 183, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--brand-blue-600)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(47, 118, 183, 0.3)";
            }}
          >
            Done
          </button>

          <p
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              textAlign: "center",
              marginTop: "16px",
              marginBottom: 0,
            }}
          >
            Questions? <a href="mailto:info@ccge.in" style={{ color: "var(--brand-blue-600)", textDecoration: "none", fontWeight: "600" }}>Contact us</a>
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
