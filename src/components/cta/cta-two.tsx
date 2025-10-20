import Image from "next/image";
import shape_underline from "@/assets/img/unlerline/cta-2-svg-1.svg";
import { CheckSvg, EmailTwo } from "../svg";

export default function CtaTwo() {
  return (
    <section className="cta-area tp-cta-2-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-lg-10">
            <div className="tp-cta-2-wrapper text-center">
              <h2 className="tp-cta-2-title">
                Start Your Global Finance Journey with {' '}
                <span>
                  CCGE
                  <Image
                    className="tp-underline-shape-12 wow bounceIn"
                    data-wow-duration="1.5s"
                    data-wow-delay=".4s"
                    src={shape_underline}
                    alt="shape-underline"
                  />
                </span>
                Today
              </h2>
              <p>Advance your career with ACCA, CFA, CMA, CPA, FRM, EA and ESG programs. Flexible learning, expert faculty, and dedicated placement support.</p>
              <div className="tp-cta-2-btn mt-25"><button className="tp-btn-round" data-open-enroll>Enquire Now</button></div>
              <div className="tp-cta-2-info-list">
                <span>
                  <span>
                    <CheckSvg />
                  </span>
                  Industry-leading success rates
                </span>
                <span>
                  <span>
                    <CheckSvg />
                  </span>
                  Placement and career guidance
                </span>
                <span>
                  <span>
                    <CheckSvg />
                  </span>
                  Learn from practicing professionals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
