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

    // Sort courses - live courses first (EA and UK Taxation), then others
    const sortedCourses = [...ccge_courses].sort((a, b) => {
        // Live courses (id 7 and 11) should come first
        const aIsLive = a.id === 7 || a.id === 11;
        const bIsLive = b.id === 7 || b.id === 11;
        
        if (aIsLive && !bIsLive) return -1;
        if (!aIsLive && bIsLive) return 1;
        return a.id - b.id; // Maintain original order for others
    });

    return (
        <>
            <section className="tp-course-area pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        {sortedCourses.map((course) => (
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

