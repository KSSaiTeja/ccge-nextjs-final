import { ICourseDT } from "@/types/course-d-t";
import CourseDetailsRightSide from "../_components/course-details-right-side";
import CourseDetailsInfo from "@/components/course/details/course-details-info";
import CourseDetailsRatingReviews from "@/components/course/details/course-details-rating-reviews";
import CourseDetailsNav from "@/components/course/details/course-details-nav";

type IProps = {
   course: ICourseDT;
};

export default function CourseDetailsArea({ course }: IProps) {

   return (
      <section className="tp-course-details-2-area pt-50 pb-80">
         <div className="container">
            <div className="row">
               <div className="col-lg-8">
                  <div className="tp-course-details-2-main-inner pr-70">
                     <div className="tp-course-details-2-nav d-flex align-items-center">
                        <CourseDetailsNav />
                     </div>

                     <div className="tp-course-details-2-content">
                        <div id="info">
                           <CourseDetailsInfo course={course} />
                        </div>

                        <div id="reviews" className="pt-70">
                           <h4 className="tp-course-details-2-main-title">Ratings & Reviews</h4>
                           <CourseDetailsRatingReviews />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4">
                  {/* right sidebar box */}
                  <CourseDetailsRightSide course={course} />
                  {/* right sidebar box */}
               </div>
            </div>
         </div>
      </section>
   );
}
