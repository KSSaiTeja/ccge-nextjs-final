'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchButton from "./button/search-button";
import NavbarMenusTwo from "./navbar/navbar-menus-2";
import logo from "@/assets/img/logo/CCGE Final Logo.png";
import HeaderStickyWrapper from "./header-sticky-provider/header-sticky-wrapper";
import OffcanvasButton from "./button/offcanvas-btn";
import EnrollmentModal from "../modal/enrollment-modal";

// prop type 
type IProps = {
  inner?: boolean;
  transparent?: boolean;
}

export default function HeaderTwo({ inner = false, transparent }: IProps) {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEnrollmentOpen(true);
  };

  return (
    <>
      <header className="header-area p-relative">
        <HeaderStickyWrapper cls={`tp-header-2 ${transparent ? 'tp-header-transparent' : ''}`}>
          <div className="container custom-container-larg">
            <div className="row align-items-center">
              <div className="col-xxl-3 col-xl-3 col-lg-6 col-6">
                <div className="tp-header-2-right d-flex align-items-center">
                  <div className="tp-header-inner-logo tp-header-logo">
                    <Link href="/">
                      <Image src={logo} alt="logo" priority style={{ height: 'auto', width: '250px' }} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-7 col-lg-6 d-none d-xl-block">
                <div className="main-menu text-xl-center d-none d-xl-block">
                  <NavbarMenusTwo />
                </div>
              </div>
              <div className="col-xxl-3 col-xl-2 col-lg-6 col-6">
                <div className="tp-header-2-contact d-flex align-items-center justify-content-end">
                  <div className="tp-header-inner-search">
                    <SearchButton/>
                  </div>
                  <div className={`tp-header-inner-btn ${inner ? '' : 'home-2'} d-none d-xxl-block`}>
                    <button className="tp-btn-inner" onClick={handleEnrollClick}>
                      Enroll Now
                    </button>
                  </div>
                  <div className="offcanvas-btn d-xxl-none ml-30">
                    <OffcanvasButton offcanvas_cls="offcanvas__2" offcanvas_menu_2={true}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeaderStickyWrapper>
      </header>

      {/* mobile offcanvas */}
      <div id="offcanvas-sidebar"/>
      {/* mobile offcanvas */}

      {/* Enrollment Modal */}
      <EnrollmentModal 
        isOpen={isEnrollmentOpen} 
        onHide={() => setIsEnrollmentOpen(false)} 
      />
    </>
  );
}
