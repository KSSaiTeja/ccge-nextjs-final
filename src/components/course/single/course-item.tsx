import React from "react";
import Image from "next/image";
import { UserSvgTwo } from "../../svg";
import { ICourseDT } from "@/types/course-d-t";
import Link from "next/link";

type IProps = {
  course: ICourseDT;
  removeTag?: boolean;
};

export default function CourseItem({ course, removeTag }: IProps) {
  const {
    slug,
    thumbnail,
    title,
    students,
    avg_rating,
    total_rating,
    category,
    fees,
  } = course || {};
  
  // Generate course page URL based on slug
  const courseUrl = `/courses/${slug}`;
  
  return (
    <div className="tp-course-item p-relative fix mb-30">
      <div className="tp-course-teacher mb-15">
        <span style={{visibility: 'hidden'}}>Placeholder</span>
      </div>
      <div className="tp-course-thumb">
        <Link href={courseUrl}>
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
        <div className="tp-course-tag mb-10">
          <span>{category}</span>
        </div>
        <div className="tp-course-meta">
          <span>
            <span><UserSvgTwo /></span>
            {" "}{students}+ Students
          </span>
        </div>
        <h4 className="tp-course-title">
          <Link href={courseUrl}
            dangerouslySetInnerHTML={{ __html: removeTag ? title.replace(/(<([^>]+)>)/gi, "") : title }}
          ></Link>
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
      <div className="tp-course-btn home-2">
        <Link href={courseUrl}>Preview this Course</Link>
      </div>
    </div>
  );
}
