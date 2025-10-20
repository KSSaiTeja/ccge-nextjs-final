import { Metadata } from "next";
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";

export const metadata: Metadata = {
  title: "Founders - Acadia",
};

export default function FoundersPage() {
  return (
    <main>
      {/* breadcrumb area start */}
      <BreadcrumbOne
        title="Our Founders"
        subtitle="Meet the visionaries behind our success"
      />
      {/* breadcrumb area end */}

      <section className="tp-about-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-about-content">
                <h2 className="tp-section-title mb-30">Our Founders</h2>
                <p className="mb-30">
                  Content about founders will be displayed here. This page
                  showcases the founders of our institution and their vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
