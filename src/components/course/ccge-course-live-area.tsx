import Link from "next/link";
import Image from "next/image";
import shape_underline from "@/assets/img/unlerline/live-2-svg-1.svg";
import { ccge_courses } from "@/data/ccge-courses-data";

export default function CCGECourseLiveArea() {
  // Get EA (id: 7) and UK Taxation (id: 11) courses
  const liveCourses = ccge_courses.filter(course => 
    course.id === 7 || course.id === 11
  );

  return (
    <section className="live-area lightblue-bg pt-95 pb-140">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="tp-section text-center mb-65">
              <h5 className="tp-section-3-subtitle">Live Courses</h5>
              <h3 className="tp-section-3-title">
                Join Our Active
                <span>
                  {" "}Live
                  <Image
                    className="tp-underline-shape-7 wow bounceIn"
                    data-wow-duration="1.5s"
                    data-wow-delay=".4s"
                    src={shape_underline}
                    alt="shape-unerline"
                  />
                </span>
                {" "}Sessions
              </h3>
            </div>
          </div>
        </div>

        <div className="row">
          {liveCourses.map((course, index) => (
            <div key={course.id} className="col-xl-6 col-lg-6 mb-30">
              <div className="tp-live-bg wow fadeInUp" data-wow-delay={`.${index + 2}s`}>
                <div className="tp-live-thumb p-relative mb-20">
                  <Link href={`/courses/${course.slug}`}>
                    <Image 
                      src={course.thumbnail} 
                      alt={course.title} 
                      width={600}
                      height={400}
                      style={{height:'auto', width: '100%'}} 
                    />
                  </Link>
                  <div className="tp-live-thumb-badge">
                    <span className="live-badge">🔴 LIVE</span>
                  </div>
                </div>
                <div className="tp-live-content">
                  <span className="tp-live-tag">{course.category}</span>
                  <h4 className="tp-live-title">
                    <Link href={`/courses/${course.slug}`}>
                      {course.title}
                    </Link>
                  </h4>
                  <div className="tp-live-meta d-flex align-items-center mb-25">
                    <div className="tp-live-rating">
                      <p>
                        {course.avg_rating} <span>/{course.total_rating}</span>
                      </p>
                      <div className="tp-live-rating-star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <div className="tp-live-total">
                    <div className="tp-live-total-student mb-15">
                      <span className="live-students-count">
                        <i className="fa-solid fa-users"></i> {course.students} Students Enrolled
                      </span>
                    </div>
                    <div className="tp-live-join">
                      <Link className="tp-btn-border" href={`/courses/${course.slug}`}>
                        View Details
                        <i className="fa-regular fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

