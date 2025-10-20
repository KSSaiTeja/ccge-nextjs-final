import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/img/logo/CCGE Final Logo.png';
import { BehanceSvg, CloseThreeSvg, DribbleSvg, InstagramSvg, YoutubeTwoSvg } from "@/components/svg";
import OffcanvasMenu from "./offcanvas-menu";
import OffcanvasMenuTwo from "./offcanvas-menu-2";

type IProps = {
   openOffCanvas: boolean;
   onHandleOffCanvas: () => void;
   offcanvas_cls?: string;
   offcanvas_menu_2?: boolean;
}
export default function OffcanvasArea({openOffCanvas,onHandleOffCanvas,offcanvas_cls,offcanvas_menu_2}:IProps) {
   return (
      <>
         <div className={`offcanvas__area ${offcanvas_cls} ${openOffCanvas ? 'offcanvas-opened' : ''}`}>
            <div className="offcanvas__wrapper">
               <div className="offcanvas__close">
                  <button onClick={onHandleOffCanvas} className="offcanvas__close-btn offcanvas-close-btn">
                     <CloseThreeSvg />
                  </button>
               </div>
               <div className="offcanvas__content">
                  <div className="offcanvas__top mb-90 d-flex justify-content-between align-items-center">
                     <div className="offcanvas__logo tp-header-logo">
                        <Link href="/">
                           <Image src={logo} alt="logo" style={{ height: 'auto', width: '280px' }} />
                        </Link>
                     </div>
                  </div>
                  <div className="offcanvas-main">
                     <div className="offcanvas-content">
                        <h3 className="offcanvas-title">Welcome to CCGE</h3>
                        <p>Corporate Commerce Global Education <br /> Professional Excellence in Finance & Accounting</p>
                     </div>
                     
                     {/* mobile menu */}
                     {offcanvas_menu_2 ? <OffcanvasMenuTwo /> : <OffcanvasMenu />}
                     {/* mobile menu */}

                     <div className="offcanvas-contact">
                        <h3 className="offcanvas-title sm">Contact Information</h3>
                        <ul>
                           <li><a href="tel:+919666660713">+91 96666 60713</a></li>
                           <li><a href="mailto:info@ccge.com">info@ccge.com</a></li>
                           <li><a href="#">Corporate Commerce Global Education</a></li>
                        </ul>
                     </div>
                     <div className="offcanvas-social">
                        <h3 className="offcanvas-title sm">Follow Us</h3>
                        <ul>
                           <li>
                              <a href="#">
                                 <InstagramSvg />
                              </a>
                           </li>
                           <li>
                              <a href="#">
                                 <DribbleSvg />
                              </a>
                           </li>
                           <li>
                              <a href="#">
                                 <BehanceSvg />
                              </a>
                           </li>
                           <li>
                              <a href="#">
                                 <YoutubeTwoSvg />
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Body Overlay */}
         <div onClick={onHandleOffCanvas} className={`body-overlay ${openOffCanvas ? 'opened' : ''}`}/>
         {/* Body Overlay */}
      </>
   )
}
