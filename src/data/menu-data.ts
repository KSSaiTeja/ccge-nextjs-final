import { IMenu, IMenuDT2 } from "@/types/menu-d-t";

const menu_data: IMenu[] = [
  {
    id: 1,
    title: "Home",
    link: "#",
    home_dropdown: [
      {
        id: 1,
        title: "University Classic",
        link: "/",
        img: "/assets/img/menu/home-1.jpg",
      },
      {
        id: 2,
        title: "Online Course",
        link: "/home-online-course",
        img: "/assets/img/menu/home-2.jpg",
      },
      {
        id: 3,
        title: "Kids Education",
        link: "/home-kids-education",
        img: "/assets/img/menu/home-3.jpg",
      },
      {
        id: 4,
        title: "Gym Coaching",
        link: "/home-gym-coaching",
        img: "/assets/img/menu/home-4.jpg",
      },
      {
        id: 5,
        title: "High School",
        link: "/home-high-school",
        img: "/assets/img/menu/home-5.jpg",
      },
      {
        id: 6,
        title: "Books Shop",
        link: "/home-books-shop",
        img: "/assets/img/menu/shop.jpg",
      },
      {
        id: 7,
        title: "Coming Soon",
        link: "#",
        img: "/assets/img/menu/coming-soon-1.jpg",
      },
      {
        id: 8,
        title: "Coming Soon",
        link: "#",
        img: "/assets/img/menu/coming-soon-2.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Academics",
    link: "#",
    sm_mega_menus: [
      { id: 1, title: "Overview", link: "/university-admission-overview" },
      { id: 2, title: "Undergraduate", link: "/university-program" },
      { id: 3, title: "Graduate Program", link: "/university-program" },
      { id: 4, title: "Schools", link: "/university-program" },
      { id: 5, title: "Online Education", link: "/course-with-filter" },
      { id: 6, title: "Off-campus learning", link: "/course-with-filter" },
      { id: 7, title: "Faculty", link: "/university-leadership" },
    ],
  },
  {
    id: 3,
    title: "Admissions",
    link: "#",
    dropdown_menus: [
      { id: 1, title: "Overview", link: "/university-admission-overview" },
      { id: 2, title: "How to Apply", link: "/university-apply" },
      { id: 3, title: "Tuition & Fees", link: "/university-tuition-fees" },
      { id: 4, title: "Financial Aid", link: "/university-financial" },
      { id: 5, title: "Dates & Deadlines", link: "/university-deadlines" },
      { id: 6, title: "Schedule a Tour", link: "/university-schedule" },
    ],
  },
  {
    id: 4,
    title: "Pages",
    link: "#",
    pages_dropdown: [
      {
        id: 1,
        title: "About",
        dropdown_menus: [
          { id: 1, title: "About Us", link: "/about" },
          { id: 2, title: "University About", link: "/university-about" },
          { id: 3, title: "Campus", link: "/university-campus" },
          { id: 4, title: "Mission & Values", link: "/university-mission" },
          { id: 5, title: "History", link: "/university-history" },
          { id: 6, title: "Our Leadership", link: "/university-leadership" },
        ],
      },
      {
        id: 2,
        title: "Get Started",
        dropdown_menus: [
          { id: 1, title: "Events", link: "/event" },
          { id: 2, title: "Event Details", link: "/event-details" },
          { id: 3, title: "Instructor", link: "/instructor" },
          { id: 4, title: "Profile", link: "/my-profile" },
          { id: 5, title: "Become a Instructor", link: "/become-instructor" },
          { id: 6, title: "Maintenance", link: "/up-coming" },
          { id: 7, title: "Contact Us", link: "/contact" },
          { id: 8, title: "Membership plans", link: "/membership-plans" },
          { id: 9, title: "FAQs", link: "/faq" },
          { id: 10, title: "Privacy Policy", link: "/privacy-policy" },
          { id: 11, title: "404 Page", link: "/not-found" },
        ],
      },
      {
        id: 3,
        title: "Shop",
        dropdown_menus: [
          { id: 1, title: "Shop", link: "/shop-grid" },
          { id: 2, title: "Single Product", link: "/shop-details/1" },
          { id: 3, title: "Cart Page", link: "/cart" },
          { id: 4, title: "Wishlist page", link: "/wishlist" },
          { id: 5, title: "My Account", link: "/my-account" },
          { id: 6, title: "Login & Register", link: "/login" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Blog",
    link: "#",
    dropdown_menus: [
      { id: 1, title: "Blog 3 Column", link: "/blog-stories" },
      { id: 2, title: "Blog Grid Sidebar", link: "/blog-stories-sidebar" },
      { id: 3, title: "Blog List Sidebar", link: "/blog-list" },
      { id: 4, title: "Blog Standard", link: "/blog-standard" },
      { id: 5, title: "Blog Details", link: "/blog-details/1" },
      {
        id: 6,
        title: "Blog Details Full Width",
        link: "/blog-details-full-width/1",
      },
    ],
  },
];

export default menu_data;

// menu data 2
export const menu_data_2: IMenuDT2[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About Us",
    link: "/about",
    // dropdown_menus: [
    //   { id: 1, title: "Founders", link: "/about/founders" },
    //   { id: 2, title: "Gallery", link: "/about/gallery" },
    // ],
  },
  {
    id: 3,
    title: "Courses",
    link: "/courses",
    dropdown_menus: [
      { id: 7, title: "EA Course", link: "/courses/ea", isLive: true },
      {
        id: 11,
        title: "UK Taxation & Accounting",
        link: "/courses/uk-taxation-accounting",
        isLive: true
      },
      { id: 1, title: "ACCA Course", link: "/courses/acca" },
      { id: 2, title: "CFA Course", link: "/courses/cfa" },
      { id: 3, title: "CMA Course", link: "/courses/cma" },
      { id: 4, title: "CPA Course", link: "/courses/cpa" },
      { id: 5, title: "FRM Course", link: "/courses/frm" },
      { id: 6, title: "ESG Course", link: "/courses/esg" },
      {
        id: 8,
        title: "Investment Banking Operations",
        link: "/courses/investment-banking-operations",
      },
      {
        id: 9,
        title: "Global Investment Banking",
        link: "/courses/global-investment-banking",
      },
      { id: 10, title: "DipIFRS Course", link: "/courses/dipifrs" },
    ],
  },
  {
    id: 4,
    title: "Contact",
    link: "/contact",
  },
];
