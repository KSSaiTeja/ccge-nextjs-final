"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ccge_courses } from "@/data/ccge-courses-data";

// Featured courses for hero carousel (EA and UK Taxation)
const heroFeaturedCourses = [
  ccge_courses.find((c) => c.slug === "ea")!,
  ccge_courses.find((c) => c.slug === "uk-taxation-accounting")!,
];

type IProps = {
  onEnrollClick: () => void;
};

export default function HeroCourseCarousel({ onEnrollClick }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroFeaturedCourses.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroFeaturedCourses.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === heroFeaturedCourses.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentCourse = heroFeaturedCourses[currentIndex];

  return (
    <div className="tp-hero-course-carousel p-relative">
      <div className="tp-course-item p-relative fix mb-30">
        <div className="tp-course-thumb">
          <Link href={`/courses/${currentCourse.slug}`}>
            <Image
              className="course-lightblue"
              src={currentCourse.thumbnail}
              alt={currentCourse.title}
              width={352}
              height={200}
            />
          </Link>
        </div>
        <div className="tp-course-content">
          <div className="tp-course-tag mb-10">
            <span>{currentCourse.category}</span>
          </div>
          <h4 className="tp-course-title">
            <Link href={`/courses/${currentCourse.slug}`}>
              {currentCourse.title}
            </Link>
          </h4>
          <div className="tp-course-rating d-flex align-items-end justify-content-between">
            <div className="tp-course-rating-star">
              <p>
                {currentCourse.avg_rating}
                <span> /{currentCourse.total_rating}</span>
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
              <span style={{ fontSize: "14px", fontWeight: "600" }}>
                {currentCourse.fees}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Buttons */}
        <div className="tp-course-btn-group home-2">
          <Link href={`/courses/${currentCourse.slug}`}>
            <button className="tp-course-btn-primary">Buy Now</button>
          </Link>
          <button className="tp-course-btn-secondary" onClick={onEnrollClick}>
            Enquire Now
          </button>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="tp-hero-carousel-controls">
        <button
          className="tp-carousel-btn tp-carousel-prev"
          onClick={handlePrev}
          aria-label="Previous course"
        >
          <i className="fa-regular fa-chevron-left"></i>
        </button>
        <div className="tp-carousel-indicators">
          {heroFeaturedCourses.map((_, index) => (
            <span
              key={index}
              className={`tp-carousel-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <button
          className="tp-carousel-btn tp-carousel-next"
          onClick={handleNext}
          aria-label="Next course"
        >
          <i className="fa-regular fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
