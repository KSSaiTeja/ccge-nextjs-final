'use client';
import { ccge_courses } from "@/data/ccge-courses-data"
import CourseItem from "../single/course-item";
import { usePathname } from "next/navigation";

export default function RelatedCourses() {
    const pathname = usePathname();
    
    // Get current course slug from pathname
    const currentSlug = pathname?.split('/').pop();
    
    // Filter out current course and get 3 other courses
    const related_courses = ccge_courses
        .filter(course => course.slug !== currentSlug)
        .slice(0, 3);
    
    return (
        <section className="tp-course-details-2-related-area pb-80">
            <div className="container">
                <div className="tp-course-details-2-related-border"></div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-course-details-2-related-heading pt-80">
                            <h3 className="tp-course-details-2-related-title">Explore More Programs</h3>
                            <p>Discover other professional certification programs offered by CCGE</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {related_courses.map((item) => (
                        <div key={item.id} className="col-lg-4 col-md-6">
                            <CourseItem course={item} removeTag={true} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
