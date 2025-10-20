import { Metadata } from "next";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-two";
import MissionArea from "@/components/mission/mission-area";
import TeamArea from "@/components/team/team-area";
import CounterSix from "@/components/counter/counter-six";

export const metadata: Metadata = {
  title: "About Us - CCGE | Corporate Commerce Global Education",
  description: "India's premier finance education institute, delivering globally recognized certifications in ACCA, CFA, CMA, CPA, and FRM with guaranteed placement support."
};

export default function AboutPage() {
  return (
    <main>
      {/* breadcrumb area start */}
      <BreadcrumbTwo 
        title="About Us" 
        subtitle="Corporate Commerce Global Education"
      />
      {/* breadcrumb area end */}

      {/* about content area start */}
      <section className="tp-about-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-about-wrapper mb-30">
                <div className="tp-section-box tp-section-box-2 mb-40">
                  <h2 className="tp-section-title">About CCGE - Corporate Commerce Global Education</h2>
                  <p className="tp-section-subtitle" style={{fontSize: '18px', lineHeight: '1.8', marginTop: '20px'}}>
                    CCGE is India&apos;s premier finance education institute, dedicated to empowering professionals with globally recognized certifications. Our comprehensive programs in ACCA, CFA, CMA, CPA, and FRM open doors to international career opportunities with industry-leading success rates and guaranteed placement support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="tp-about-3-wrapper mb-30">
                <div className="tp-section-box mb-30">
                  <h3 className="tp-section-title-3">Our Mission</h3>
                  <p style={{fontSize: '16px', lineHeight: '1.8'}}>
                    To be the leading finance education provider in India, delivering world-class certification programs that transform careers and create global opportunities for ambitious professionals in the finance and accounting industry.
                  </p>
                  <ul className="mt-20" style={{listStyle: 'none', padding: 0}}>
                    <li style={{marginBottom: '10px', fontSize: '16px'}}><i className="fa-solid fa-check" style={{color: 'var(--brand-blue-600)', marginRight: '10px'}}></i> Industry-aligned curriculum with real-world applications</li>
                    <li style={{marginBottom: '10px', fontSize: '16px'}}><i className="fa-solid fa-check" style={{color: 'var(--brand-blue-600)', marginRight: '10px'}}></i> Expert faculty with 15+ years of global experience</li>
                    <li style={{marginBottom: '10px', fontSize: '16px'}}><i className="fa-solid fa-check" style={{color: 'var(--brand-blue-600)', marginRight: '10px'}}></i> Comprehensive placement support with 1000+ partners</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="tp-about-3-wrapper mb-30">
                <div className="tp-section-box mb-30">
                  <h3 className="tp-section-title-3">Our Vision</h3>
                  <p style={{fontSize: '16px', lineHeight: '1.8'}}>
                    To become India&apos;s premier finance education institute, creating an environment where students excel academically, develop career skills, and grow as well-rounded professionals ready to compete globally.
                  </p>
                  <p style={{fontSize: '16px', lineHeight: '1.8', marginTop: '15px'}}>
                    We develop future finance leaders through academic excellence, innovation, and ethical values that shape tomorrow&apos;s business landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about content area end */}

      {/* why choose us area start */}
      <section className="tp-feature-area pt-90 pb-90" style={{background: '#f8f9fa'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-section-box text-center mb-60">
                <h2 className="tp-section-title">
                  Why Choose <span style={{color: 'var(--brand-blue-600)'}}>Corporate Commerce</span>
                </h2>
                <p className="tp-section-subtitle">We stand out as India&apos;s top finance education provider with proven results and exceptional value for ambitious professionals.</p>
              </div>
            </div>
          </div>
          <div className="row" style={{rowGap: '30px'}}>
            <div className="col-lg-4 col-md-6">
              <div className="tp-feature-item text-center mb-0" style={{background: 'white', padding: '40px 30px', borderRadius: '10px', height: '100%'}}>
                <div className="tp-feature-icon mb-20">
                  <i className="fa-solid fa-chalkboard-teacher" style={{fontSize: '48px', color: 'var(--brand-blue-600)'}}></i>
                </div>
                <h4 className="tp-feature-title mb-15">Expert Faculty</h4>
                <p>Industry-experienced faculty with advanced degrees deliver practical insights and real-world knowledge to guide your academic success.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="tp-feature-item text-center mb-0" style={{background: 'white', padding: '40px 30px', borderRadius: '10px', height: '100%'}}>
                <div className="tp-feature-icon mb-20">
                  <i className="fa-solid fa-book-open" style={{fontSize: '48px', color: 'var(--brand-blue-600)'}}></i>
                </div>
                <h4 className="tp-feature-title mb-15">Industry-Relevant Curriculum</h4>
                <p>Cutting-edge curriculum updated regularly with latest business trends, ensuring you graduate with skills that employers actually want.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="tp-feature-item text-center mb-0" style={{background: 'white', padding: '40px 30px', borderRadius: '10px', height: '100%'}}>
                <div className="tp-feature-icon mb-20">
                  <i className="fa-solid fa-briefcase" style={{fontSize: '48px', color: 'var(--brand-blue-600)'}}></i>
                </div>
                <h4 className="tp-feature-title mb-15">Guaranteed Placement Assistance</h4>
                <p>Dedicated placement team connects you with top companies through resume workshops, interview prep, and career counseling for dream job success.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="tp-feature-item text-center mb-0" style={{background: 'white', padding: '40px 30px', borderRadius: '10px', height: '100%'}}>
                <div className="tp-feature-icon mb-20">
                  <i className="fa-solid fa-users" style={{fontSize: '48px', color: 'var(--brand-blue-600)'}}></i>
                </div>
                <h4 className="tp-feature-title mb-15">Holistic Development Focus</h4>
                <p>Leadership programs, extracurricular activities, and community service develop well-rounded individuals ready to make meaningful contributions to society.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="tp-feature-item text-center mb-0" style={{background: 'white', padding: '40px 30px', borderRadius: '10px', height: '100%'}}>
                <div className="tp-feature-icon mb-20">
                  <i className="fa-solid fa-building" style={{fontSize: '48px', color: 'var(--brand-blue-600)'}}></i>
                </div>
                <h4 className="tp-feature-title mb-15">State-of-the-Art Facilities</h4>
                <p>Modern classrooms, advanced labs, comprehensive libraries, and collaborative spaces create an optimal learning environment with recreational areas for balance.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="tp-feature-item text-center mb-0" style={{background: 'white', padding: '40px 30px', borderRadius: '10px', height: '100%'}}>
                <div className="tp-feature-icon mb-20">
                  <i className="fa-solid fa-network-wired" style={{fontSize: '48px', color: 'var(--brand-blue-600)'}}></i>
                </div>
                <h4 className="tp-feature-title mb-15">Thriving Alumni Network</h4>
                <p>Strong alumni network of industry leaders provides mentorship, networking opportunities, and career guidance to accelerate your professional growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* why choose us area end */}

      {/* counter area start */}
      <CounterSix />
      {/* counter area end */}

      {/* mission area start */}
      <MissionArea top_cls="pt-120 pb-120" />
      {/* mission area end */}

      {/* team area start */}
      <TeamArea />
      {/* team area end */}

      {/* cta area start */}
      <section className="tp-cta-area pt-90 pb-90" style={{background: 'var(--brand-blue-600)'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="tp-cta-content">
                <h2 className="tp-cta-title" style={{color: 'white', marginBottom: '10px'}}>Build Your Future with CCGE</h2>
                <p style={{color: 'white', fontSize: '18px'}}>
                  Unlock your potential with India&apos;s top finance education institute. Our comprehensive programs prepare you for success in business, finance, and global markets. Join our successful graduates who are shaping India&apos;s business landscape.
                </p>
              </div>
            </div>
            <div className="col-lg-4 text-end">
              <div className="tp-cta-btn">
                <a href="/courses" className="tp-btn-white" style={{background: 'white', color: 'var(--brand-blue-600)', padding: '15px 40px', borderRadius: '6px', fontWeight: '600', display: 'inline-block'}}>
                  Explore Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* cta area end */}
    </main>
  );
}
