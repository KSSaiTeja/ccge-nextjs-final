import { Metadata } from "next";
import { ccge_courses } from "@/data/ccge-courses-data";
import CourseDetailsBreadcrumb from "@/app/(course-details)/course-details/_components/course-details-breadcrumb";
import CourseDetailsArea from "@/app/(course-details)/course-details/_components/course-details-area";
import RelatedCourses from "@/components/course/details/related-courses";

export const metadata: Metadata = {
  title: "CPA Course - CCGE | Corporate Commerce Global Education",
  description: "Master CPA with CCGE's comprehensive public accounting program"
};

export default function CPACoursePage() {
  const course = ccge_courses.find((item) => item.id === 4);
  
  return (
    course ? (
      <main>
        {/* breadcrumb area start */}
        <CourseDetailsBreadcrumb course={course} />
        {/* breadcrumb area end */}

        {/* course details area */}
        <CourseDetailsArea course={course} />
        {/* course details area */}

        {/* related course start */}
        <RelatedCourses/>
        {/* related course end */}
      </main>
    ) : (
      <div className="text-center mt-100 mb-80">
        <h3>Course not found</h3>
      </div>
    )
  );
}
