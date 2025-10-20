'use client';
import React from "react";
import { MinusSvg, PlusThreeSvg } from "@/components/svg";
import { ICourseDT } from "@/types/course-d-t";

type IProps = {
  course: ICourseDT;
};

export default function CourseDetailsInfo({ course }: IProps) {
  const [showMore, setShowMore] = React.useState(false);
  
  const getLearningPoints = (courseId: number) => {
    switch(courseId) {
      case 1: // ACCA
        return [
          "Master 13 professional accounting exams across 3 levels",
          "Applied Knowledge: Business & Technology, Management Accounting, Financial Accounting",
          "Applied Skills: Corporate Law, Performance Management, Taxation, Financial Reporting",
          "Strategic Professional: Business Reporting, Business Leader, and elective subjects",
          "Global recognition in 180+ countries",
          "Professional development and career advancement opportunities"
        ];
      case 2: // CFA
        return [
          "Comprehensive investment management knowledge across 3 levels",
          "Ethics and professional standards in finance",
          "Quantitative methods and economic analysis",
          "Financial reporting and corporate finance",
          "Equity, fixed income, and alternative investments",
          "Portfolio management and wealth planning"
        ];
      case 3: // CMA
        return [
          "Strategic financial management and decision support",
          "Financial planning, performance, and analytics",
          "Cost management and budgeting techniques",
          "Internal controls and risk management",
          "Professional ethics and corporate governance",
          "Management accounting best practices"
        ];
      case 4: // CPA
        return [
          "US Generally Accepted Accounting Principles (GAAP)",
          "Auditing and attestation standards",
          "Financial accounting and reporting requirements",
          "Business law and regulation compliance",
          "Taxation and business environment concepts",
          "Professional ethics and responsibilities"
        ];
      case 5: // FRM
        return [
          "Foundations of risk management",
          "Quantitative analysis and financial markets",
          "Valuation and risk models",
          "Market, credit, and operational risk",
          "Risk management and investment management",
          "Current issues in risk management"
        ];
      case 6: // ESG
        return [
          "ESG analysis and integration techniques",
          "Sustainable investing principles",
          "Environmental risk assessment",
          "Social impact measurement",
          "Governance frameworks and best practices",
          "Global ESG regulations and standards"
        ];
      case 7: // EA
        return [
          "US tax law for individuals and businesses",
          "Tax preparation and planning strategies",
          "IRS representation and procedures",
          "Ethics and professional conduct",
          "Tax compliance and audit defense",
          "Client relationship management"
        ];
      case 8: // Investment Banking Operations
        return [
          "Trade lifecycle and settlement processes",
          "Capital markets operations",
          "Reconciliation and corporate actions",
          "Operational risk management",
          "Compliance and regulatory requirements",
          "Technology systems and platforms"
        ];
      case 9: // Global Investment Banking
        return [
          "Financial modeling and valuation techniques",
          "M&A process and deal execution",
          "Capital raising strategies",
          "Due diligence and risk assessment",
          "Pitch book development and presentation",
          "Client relationship and business development"
        ];
      case 10: // DipIFRS
        return [
          "International Financial Reporting Standards (IFRS)",
          "Group reporting and consolidation",
          "Financial instruments and derivatives",
          "Revenue recognition and lease accounting",
          "Deferred tax and foreign exchange",
          "IFRS implementation and compliance"
        ];
      case 11: // UK Taxation & Accounting
        return [
          "UK tax system and legislation",
          "Income tax and capital gains tax",
          "Corporation tax and VAT",
          "Inheritance tax and estate planning",
          "Tax planning and compliance",
          "HMRC procedures and regulations"
        ];
      default:
        return [
          "Professional certification preparation",
          "Industry-specific knowledge and skills",
          "Practical application and case studies",
          "Exam strategies and techniques",
          "Career advancement opportunities",
          "Global recognition and credibility"
        ];
    }
  };

  return (
    <div id="info">
      <h4 className="tp-course-details-2-main-title">About Course</h4>
      <div className="tp-course-details-2-text mb-60">
        <div className={`content ${showMore ? 'show' : ''}`}>
          <p>{course.description}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Exam Pattern:</strong> {course.examPattern}</p>
          <p><strong>Fees:</strong> {course.fees}</p>
          <p><strong>Eligibility:</strong> {course.eligibility}</p>
          <p><strong>Certifications:</strong> {course.certifications}</p>
        </div>
        <a onClick={() => setShowMore(!showMore)} className="tp-course-details-showmore show-more-button">
          <span className="svg-icon">
            {showMore ? <MinusSvg clr="#3C66F9" /> : <PlusThreeSvg clr="#3C66F9" />}
          </span> 
          Show {showMore ? 'Less' : 'More'}
       </a>
      </div>
      <h4 className="tp-course-details-2-main-title">What will you Learn?</h4>
      <div className="tp-course-details-2-list">
        <ul>
          {getLearningPoints(course.id).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <p>With CCGE&apos;s expert faculty and comprehensive study materials, you&apos;ll gain the knowledge and skills needed to excel in your professional certification journey and advance your career in finance and accounting.</p>
      </div>
    </div>
  )
}
