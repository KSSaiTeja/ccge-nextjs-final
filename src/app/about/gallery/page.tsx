import { Metadata } from "next";
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";

export const metadata: Metadata = {
  title: "Gallery - Acadia",
};

export default function GalleryPage() {
  return (
    <main>
      {/* breadcrumb area start */}
      <BreadcrumbOne
        title="Gallery"
        subtitle="Explore our moments and memories"
      />
      {/* breadcrumb area end */}

      <section className="tp-gallery-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-gallery-content">
                <h2 className="tp-section-title mb-30">Our Gallery</h2>
                <p className="mb-30">
                  Gallery content will be displayed here. This page showcases
                  images and moments from our institution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
