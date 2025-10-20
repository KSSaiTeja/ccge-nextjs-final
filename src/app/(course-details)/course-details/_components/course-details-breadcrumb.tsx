import Link from "next/link";
import { HomeSvg } from "@/components/svg";
import { ICourseDT } from "@/types/course-d-t";
import { removeTagInText } from "@/utils";

type IProps = {
   course: ICourseDT
}
export default function CourseDetailsBreadcrumb({ course }: IProps) {
   return (
      <section className="tp-breadcrumb__area pt-25 pb-55 p-relative z-index-1 fix">
         <div className="tp-breadcrumb__bg" style={{ backgroundImage: "url(/assets/img/breadcrumb/breadcrumb-bg-2.jpg)" }}></div>
         <div className="container">
            <div className="row align-items-center">
               <div className="col-sm-12">
                  <div className="tp-breadcrumb__content">
                     <div className="tp-breadcrumb__list course-details mb-70">
                        <span><Link href="/"><HomeSvg/></Link></span>
                        <span>Courses  /  {removeTagInText(course.title)}</span>
                     </div>

                     <div className="tp-course-details-2-header">
                        <span className="tp-course-details-2-category">{course.category}</span>
                        <h3 className="tp-course-details-2-title">{removeTagInText(course.title)}</h3>
                        <div className="tp-course-details-2-meta-wrapper d-flex align-items-center flex-wrap">
                           <div className="tp-course-details-2-meta">
                              <span className="tp-course-details-2-meta-subtitle">Category</span>
                              <h3 className="tp-course-details-2-meta-title">{course.category}</h3>
                           </div>
                           <div className="tp-course-details-2-meta">
                              <span className="tp-course-details-2-meta-subtitle">Students Enrolled</span>
                              <h3 className="tp-course-details-2-meta-title">{course.students}+</h3>
                           </div>
                           <div className="tp-course-details-2-meta text-end">
                              <div className="tp-course-details-2-meta-rating-wrapper">
                                 <div className="tp-course-rating-icon">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                 </div>
                                 <span className="tp-course-details-2-meta-subtitle">Review</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
