import { Metadata } from "next";
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";

export const metadata: Metadata = {
  title: "DipIFRS Course - Acadia",
};

export default function DipIFRSCoursePage() {
  return (
    <main>
      {/* breadcrumb area start */}
      <BreadcrumbOne
        title="DipIFRS Course"
        subtitle="Diploma in International Financial Reporting Standards"
      />
      {/* breadcrumb area end */}

      <section className="tp-course-details-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-course-details-content">
                <h2 className="tp-section-title mb-30">DipIFRS Course</h2>
                <p className="mb-30">
                  Detailed information about DipIFRS Course will be displayed
                  here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
