'use client';
import useScrollSpy from "@/hooks/use-scroll-spy";


export default function CourseDetailsNav() {
    const sections = ["info", "reviews"];
    const activeSection = useScrollSpy(sections);
    return (
        <nav>
            <ul id="course_details2_nav">
                <li className={activeSection === "info" ? "current" : ""}>
                    <a href="#info">Course Info</a>
                </li>
                <li className={activeSection === "reviews" ? "current" : ""}>
                    <a href="#reviews">Reviews</a>
                </li>
            </ul>
        </nav>
    )
}
