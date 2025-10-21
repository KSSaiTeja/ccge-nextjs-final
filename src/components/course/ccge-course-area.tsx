'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import shape_underline from "@/assets/img/unlerline/course-2-svg-1.svg";
import category_shape from "@/assets/img/shape/category-2-shape-1.png";
import CCGECourseCard from "./single/ccge-course-card";
import EnrollmentModal from "../modal/enrollment-modal";
import { ccge_courses } from "@/data/ccge-courses-data";

const tab_navs = ["All Courses", "Live Now"];

export default function CCGECourseArea() {
  const [activeTab, setActiveTab] = useState("All Courses");
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  const handleEnrollClick = () => {
    setIsEnrollmentOpen(true);
  };

  // Get live courses (EA and UK Taxation)
  const liveCourses = ccge_courses.filter(course => 
    course.id === 7 || course.id === 11 // EA and UK Taxation
  );

  // Get remaining courses
  const otherCourses = ccge_courses.filter(course => 
    course.id !== 7 && course.id !== 11
  );

  // For "All Courses" tab - display live courses first, then top 4 others
  const top6Courses = [...liveCourses, ...otherCourses.slice(0, 4)];

  const displayCourses = activeTab === "Live Now" ? liveCourses : top6Courses;

  return (
    <>
      <section className="course-area tp-course-wrapper mt-100 mb-100">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xxl-5 col-xl-6 col-lg-7">
              <div className="tp-section mb-40">
                <h5 className="tp-section-3-subtitle">Our Courses</h5>
                <h3 className="tp-section-3-title">
                  Top Professional
                  <span>
                    {" "}Programs
                    <Image
                      className="tp-underline-shape-6 wow bounceIn"
                      data-wow-duration="1.5s"
                      data-wow-delay=".4s"
                      src={shape_underline}
                      alt="shape-underline"
                    />
                  </span>
                </h3>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-6 col-lg-5">
              <div className="tp-course-tab d-flex justify-content-lg-end mb-40">
                <nav>
                  <div className="nav" id="nav-tab" role="tablist">
                    {tab_navs.map((tab) => (
                      <button
                        key={tab}
                        className={`nav-link ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                        type="button"
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content wow fadeInUp" data-wow-delay=".3s">
                <div className="row">
                  {displayCourses.map((course) => (
                    <div key={course.id} className="col-lg-4 col-md-6">
                      <CCGECourseCard 
                        course={course} 
                        onEnrollClick={handleEnrollClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-lg-8">
              <div
                className="tp-category-banner d-flex align-items-center justify-content-between tp-category-banner-bg mt-35"
                data-background="assets/img/bg/category-bg.jpg"
                style={{ backgroundImage: "url(/assets/img/bg/category-bg.jpg)" }}
              >
                <div className="tp-category-banner-content d-flex align-items-center">
                  <div className="tp-category-banner-shape">
                    <Image src={category_shape} alt="shape" />
                  </div>
                  <div className="tp-category-banner-text">
                    <span>Ready to Excel?</span>
                    <h4 className="tp-category-banner-title">
                      Discover All Professional Programs
                    </h4>
                  </div>
                </div>
                <div className="tp-category-banner-btn">
                  <Link className="tp-btn-2" href="/courses">
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <EnrollmentModal 
        isOpen={isEnrollmentOpen} 
        onHide={() => setIsEnrollmentOpen(false)} 
      />
    </>
  );
}

