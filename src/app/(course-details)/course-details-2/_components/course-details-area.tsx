import { ICourseDT } from "@/types/course-d-t";
import CourseDetailsBox from "./course-details-box";
import CourseDetailsLists from "./course-details-lists";
import CourseDetailsBreadcrumbContent from "./course-details-breadcrumb-content";
import CourseDetailsInfo from "@/components/course/details/course-details-info";
import CourseDetailsNav from "@/components/course/details/course-details-nav";
import CourseDetailsRatingReviews from "@/components/course/details/course-details-rating-reviews";

type IProps = {
   course: ICourseDT;
}
export default function CourseDetailsArea({ course }: IProps) {
   return (
      <section className="tp-breadcrumb__area pt-110 pb-90 p-relative z-index-1">
         <div className="tp-breadcrumb__bg details3" style={{ backgroundImage: `url(/assets/img/breadcrumb/breadcrumb-bg-3.jpg)` }}></div>
         <div className="container">
            <div className="row">
               <div className="col-sm-12">
                  <CourseDetailsBreadcrumbContent course={course} />
               </div>

               <div className="col-lg-5">
                  <CourseDetailsBox course={course} />
               </div>
               <div className="col-lg-7">
                  <CourseDetailsLists />

                  <div className="tp-course-details-3-main">
                     <div className="tp-course-details-2-nav d-flex align-items-center">
                        <CourseDetailsNav />
                     </div>

                     <div className="tp-course-details-2-content">
                        <CourseDetailsInfo course={course} />

                        <div id="reviews" className="pt-70">
                           <h4 className="tp-course-details-2-main-title">Ratings & Reviews</h4>
                           <CourseDetailsRatingReviews />
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
