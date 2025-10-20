import Image from 'next/image';
import Link from 'next/link';
import { DownArrowTwo, Email, RightArrowFour } from '../svg';
import FooterSocial from './footer-social';
import { footerLinks } from '@/data/footer-links';
import logo from '@/assets/img/logo/CCGE Final Logo.png';

export default function FooterTwo() {
   return (
      <footer>
         <div className="tp-footer-2">
            <div className="tp-footer-main pt-70 pb-55">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="tp-footer-widget tp-footer-2-col-1 mb-30">
                           <div className="tp-footer-widget-logo mb-20 tp-header-logo">
                              <Link href="/">
                                 <Image src={logo} alt="logo" style={{height:"auto"}} />
                              </Link>
                           </div>
                           <div className="tp-footer-widget-content">
                              <p>Corporate Commerce Global Education (CCGE) — Professional excellence in Finance & Accounting certifications with expert mentorship and placement support.</p>
                           </div>
                           <div className="tp-footer-contact">
                              <div className="tp-footer-btn">
                                 <Link className="tp-btn-round" href="/courses">Explore Courses
                                    <span>
                                       <RightArrowFour />
                                    </span>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="tp-footer-widget tp-footer-2-col-2 mb-30">
                           <h4 className="tp-footer-widget-title mb-15">About</h4>
                           <div className="tp-footer-widget-link">
                              <ul>
                                 {footerLinks.link_one.map((link) => (
                                    <li key={link.id}>
                                       <Link href={link.link}>{link.title}</Link>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="tp-footer-widget tp-footer-2-col-3 mb-30">
                           <h4 className="tp-footer-widget-title mb-15">Quick links</h4>
                           <div className="tp-footer-widget-link">
                              <ul>
                                 {footerLinks.link_two.map((link) => (
                                    <li key={link.id}>
                                       <Link href={link.link}>{link.title}</Link>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="p-footer-widget tp-footer-2-col-4 mb-30">
                           <h4 className="tp-footer-widget-title mb-20">Contact</h4>
                           <div className="tp-footer-contact">
                              <span>Hyderabad, Telangana, India</span>
                              <a href="tel:+919666660713">+91 96666 60713 / 14</a>
                           </div>
                           <div className="tp-footer-contact-mail mb-20">
                              <a href="mailto:info@ccge.in">
                                 <span>
                                    <Email />
                                 </span>
                                 info@ccge.in</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="tp-footer-bottom">
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-lg-3 col-md-4">
                        <div className="tp-footer-bottom-social">
                           <FooterSocial />
                        </div>
                     </div>
                     <div className="col-lg-6 col-md-5">
                        <div className="tp-footer-copyright text-start text-md-center">
                           <span>© {new Date().getFullYear()} <a href="#">Corporate Commerce Global Education</a>. All rights reserved.</span>
                        </div>
                     </div>
                     <div className="col-lg-3 col-md-3">
                        <div className="header-bottom__lang-2 text-start text-md-end">
                           <ul>
                              <li>
                                 <a id="header-bottom__lang-toggle" href="#">
                                    <span>EN</span>
                                    <span>
                                       <DownArrowTwo />
                                    </span>
                                 </a>
                                 <ul className="header-bottom__lang-submenu-2">
                                    <li><a href="#">Arabic</a></li>
                                    <li><a href="#">Spanish</a></li>
                                    <li><a href="#">Mandarin</a></li>
                                 </ul>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}
