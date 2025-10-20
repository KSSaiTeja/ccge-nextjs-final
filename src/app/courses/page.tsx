import { Metadata } from "next";
import CoursesBanner from "./_components/courses-banner";
import CoursesArea from "./_components/courses-area";
import BannerArea from "@/components/banner/banner-area";

export const metadata: Metadata = {
    title: "Courses - CCGE | Corporate Commerce Global Education",
    description: "Explore our comprehensive finance and accounting certification programs including ACCA, CFA, CMA, CPA, FRM, EA, ESG, and more."
}

export default function CoursesPage() {
    return (
        <>
            {/* courses banner area start */}
            <CoursesBanner/>
            {/* courses banner area end */}

            {/* courses area */}
            <CoursesArea/>
            {/* courses area */}

            {/* banner area start */}
            <BannerArea/>
            {/* banner area end */}
        </>
    )
}

