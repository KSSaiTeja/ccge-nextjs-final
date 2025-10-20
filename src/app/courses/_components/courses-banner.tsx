'use client';
import Link from "next/link";
import { HomeSvg } from "@/components/svg";
import { ccge_courses } from "@/data/ccge-courses-data";

export default function CoursesBanner() {
  return (
    <section className="tp-course-filter-area tp-course-filter-bg p-relative pt-180 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-breadcrumb__content-filter mb-50">
              <div className="tp-breadcrumb__list">
                <span><Link href="/"><HomeSvg /></Link></span>
                <span className="color">All Courses</span>
              </div>
              <h3 className="tp-breadcrumb__title">CCGE Professional Courses</h3>
              <p>Explore our comprehensive collection of <span>{ccge_courses.length}</span> professional finance and accounting certification programs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

