import Image from "next/image";
import { CloseThreeSvg, SearchSvg, StarThree } from "../svg";
import Link from "next/link";
import { useState, useEffect } from "react";

// CCGE Top Programs Data - 4 Best Courses (Exact CCGE Course Names)
const ccge_top_programs = [
  {
    id: 1,
    title: "ACCA Course",
    category: "ACCA Course",
    thumbnail: "/assets/img/ccge-course-thumbnails/acca-course.jpg",
    link: "/courses/acca",
    price: 299,
    rating: 5
  },
  {
    id: 2,
    title: "CFA Course", 
    category: "CFA Course",
    thumbnail: "/assets/img/ccge-course-thumbnails/cfa-course.jpg",
    link: "/courses/cfa",
    price: 399,
    rating: 5
  },
  {
    id: 3,
    title: "CPA Course",
    category: "CPA Course",
    thumbnail: "/assets/img/ccge-course-thumbnails/cpa-course.jpg", 
    link: "/courses/cpa",
    price: 379,
    rating: 5
  },
  {
    id: 4,
    title: "FRM Course",
    category: "FRM Course",
    thumbnail: "/assets/img/ccge-course-thumbnails/frm-course.jpg",
    link: "/courses/frm", 
    price: 329,
    rating: 5
  }
];

// Course data for search (Exact CCGE Course Names)
const courseData = [
  { id: 1, title: "ACCA Course", link: "/courses/acca", category: "ACCA Course" },
  { id: 2, title: "CFA Course", link: "/courses/cfa", category: "CFA Course" },
  { id: 3, title: "CMA Course", link: "/courses/cma", category: "CMA Course" },
  { id: 4, title: "CPA Course", link: "/courses/cpa", category: "CPA Course" },
  { id: 5, title: "FRM Course", link: "/courses/frm", category: "FRM Course" },
  { id: 6, title: "ESG Course", link: "/courses/esg", category: "ESG Course" },
  { id: 7, title: "EA Course", link: "/courses/ea", category: "EA Course" },
  { id: 8, title: "Investment Banking Operations", link: "/courses/investment-banking-operations", category: "Investment Banking Operations" },
  { id: 9, title: "Global Investment Banking", link: "/courses/global-investment-banking", category: "Global Investment Banking" },
  { id: 10, title: "DipIFRS Course", link: "/courses/dipifrs", category: "DipIFRS Course" },
  { id: 11, title: "UK Taxation & Accounting", link: "/courses/uk-taxation-accounting", category: "UK Taxation & Accounting" },
];

type IProps = {
   isSearchOpen: boolean;
   onHide: () => void;
}

export default function SearchPopup({ isSearchOpen, onHide }: IProps) {
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] = useState(courseData);

   useEffect(() => {
      if (searchTerm.trim() === "") {
         setSearchResults(courseData);
      } else {
         const filtered = courseData.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase())
         );
         setSearchResults(filtered);
      }
   }, [searchTerm]);

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   return (
      <>
         <div className={`tp-search-area ${isSearchOpen ? 'opened' : ''}`}>
            <div className="tp-search-inner p-relative">
               <div className="tp-search-close">
                  <button className="tp-search-close-btn" onClick={onHide}>
                     <CloseThreeSvg clr="#57595F" />
                  </button>
               </div>
               <div className="container">
                  <div className="row">
                     <div className="tp-search-wrapper">
                        <div className="col-lg-9">
                           <div className="tp-search-content blue">
                              <div className="search p-relative">
                                 <input 
                                    type="text" 
                                    className="search-input" 
                                    placeholder="Search courses..." 
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                 />
                                 <button className="tp-search-icon">
                                    <SearchSvg />
                                 </button>
                              </div>
                              
                              {/* Search Results */}
                              {searchTerm && (
                                 <div className="tp-search-results">
                                    <h4 className="tp-search-results-title">Search Results</h4>
                                    <div className="search-results-list">
                                       {searchResults.length > 0 ? (
                                          searchResults.map((course) => (
                                             <Link key={course.id} href={course.link} className="search-result-item" onClick={onHide}>
                                                <div className="search-result-content">
                                                   <h5>{course.title}</h5>
                                                   <span className="search-result-category">{course.category}</span>
                                                </div>
                                             </Link>
                                          ))
                                       ) : (
                                          <p className="no-results">No courses found matching your search.</p>
                                       )}
                                    </div>
                                 </div>
                              )}

                              <div className="tp-search-course-wrap">
                                 <h3 className="tp-search-course-title">OUR TOP PROGRAMS</h3>
                                 <div className="row">
                                    {ccge_top_programs.map((item) => (
                                       <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                                          <div className="tp-search-course-item mb-30">
                                             <div className="tp-search-course-thumb mb-5">
                                                <Link href={item.link} onClick={onHide}>
                                                   <Image src={item.thumbnail} alt={item.title} width={186} height={104} />
                                                </Link>
                                             </div>
                                             <div className="tp-search-course-content">
                                                <div className="tp-search-course-star">
                                                   <span><StarThree /></span>
                                                   <span><StarThree /></span>
                                                   <span><StarThree /></span>
                                                   <span><StarThree /></span>
                                                   <span><StarThree /></span>
                                                </div>
                                                <h4 className="tp-search-course-item-title">
                                                   <Link href={item.link} onClick={onHide}>
                                                     {item.category}
                                                   </Link>
                                                </h4>
                                                <div className="tp-search-course-price">
                                                   <span>${item.price}</span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div onClick={onHide} className={`body-overlay ${isSearchOpen?'opened':''}`}></div>
      </>
   )
}
