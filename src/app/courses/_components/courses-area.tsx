'use client';
import { useState } from "react";
import CCGECourseCard from "@/components/course/single/ccge-course-card";
import EnrollmentModal from "@/components/modal/enrollment-modal";
import { ccge_courses } from "@/data/ccge-courses-data";

export default function CoursesArea() {
    const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

    const handleEnrollClick = () => {
        setIsEnrollmentOpen(true);
    };

    return (
        <>
            <section className="tp-course-area pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        {ccge_courses.map((course) => (
                            <div key={course.id} className="col-lg-4 col-md-6">
                                <CCGECourseCard 
                                    course={course} 
                                    onEnrollClick={handleEnrollClick}
                                />
                            </div>
                        ))}
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

