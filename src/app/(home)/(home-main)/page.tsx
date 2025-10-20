import { Metadata } from "next";
import BannerArea from "@/components/banner/banner-area";
import CategoryArea from "@/components/category/category-area";
import CCGECourseArea from "@/components/course/ccge-course-area";
import CtaTwo from "@/components/cta/cta-two";
import FunFactArea from "@/components/fun-fact/fun-fact-area";
import HeroAreaTwo from "@/components/hero-area/hero-area-two";
import TeamArea from "@/components/team/team-area";
import TestimonialTwo from "@/components/testimonial/testimonial-two";

export const metadata: Metadata = {
  title: "Home - Corporate Commerce",
};

export default function HomePage() {
  return (
    <main>
      {/* hero area start */}
      <HeroAreaTwo />
      {/* hero area end */}

      {/* category area */}
      <CategoryArea />
      {/* category area */}

      {/* fun fact area start */}
      <FunFactArea />
      {/* fun fact area end */}

      {/* course area start */}
      <CCGECourseArea />
      {/* course area end */}

      {/* testimonial area start */}
      <TestimonialTwo />
      {/* testimonial area end */}

      {/* team area start */}
      <TeamArea />
      {/* team area end */}

      {/* banner area start */}
      <BannerArea />
      {/* banner area end */}

      {/* cta area start */}
      <CtaTwo />
      {/* cta area end */}
    </main>
  );
}
