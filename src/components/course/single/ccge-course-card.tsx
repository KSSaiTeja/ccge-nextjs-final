'use client';
import React from "react";
import Image from "next/image";
import { ICourseDT } from "@/types/course-d-t";
import Link from "next/link";

type IProps = {
  course: ICourseDT;
  onEnrollClick: () => void;
};

export default function CCGECourseCard({ course, onEnrollClick }: IProps) {
  const {
    slug,
    thumbnail,
    title,
    avg_rating,
    total_rating,
    fees,
    isLiveCourse,
  } = course || {};

  return (
    <div className="tp-course-item ccge-course-card p-relative fix mb-30">
      <div className="tp-course-thumb">
        <Link href={`/courses/${slug}`}>
          <Image
            className="course-lightblue"
            src={thumbnail}
            alt={title}
            width={352}
            height={200}
          />
        </Link>
        {/* Live Badge */}
        {isLiveCourse && (
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'linear-gradient(135deg, #FF3B3B 0%, #FF6B6B 100%)',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '25px',
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 15px rgba(255, 59, 59, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 10,
            animation: 'pulse 2s infinite'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#FFFFFF',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'blink 1.5s infinite'
            }}></span>
            Live
          </div>
        )}
      </div>
      <div className="tp-course-content">
        <h4 className="tp-course-title">
          <Link href={`/courses/${slug}`}>
            {title}
          </Link>
        </h4>
        <div className="tp-course-rating d-flex align-items-end justify-content-between">
          <div className="tp-course-rating-star">
            <p>
              {avg_rating}
              <span> /{total_rating}</span>
            </p>
            <div className="tp-course-rating-icon">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="tp-course-pricing home-2">
            <span style={{fontSize: '14px', fontWeight: '600'}}>{fees}</span>
          </div>
        </div>
      </div>
      
      {/* Hover Buttons */}
      <div className="tp-course-btn-group ccge-hover-buttons">
        <Link href={`/courses/${slug}`}>
          <button className="tp-course-btn-primary">
            Buy Now
          </button>
        </Link>
        <button className="tp-course-btn-secondary" onClick={onEnrollClick}>
          Enquire Now
        </button>
      </div>
    </div>
  );
}

