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
        <button className="tp-course-btn-primary" onClick={onEnrollClick}>
          Buy Now
        </button>
        <button className="tp-course-btn-secondary" onClick={onEnrollClick}>
          Enquire Now
        </button>
      </div>
    </div>
  );
}

