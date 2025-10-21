import Image from "next/image";
import { CloseThreeSvg, SearchSvg, StarThree } from "../svg";
import Link from "next/link";
import { useState, useEffect } from "react";

// CCGE Live Courses Data - EA and UK Taxation Only
const ccge_live_courses = [
  {
    id: 7,
    title: "EA Course",
    category: "US Taxation & Accounting",
    thumbnail: "/assets/img/ccge-course-thumbnails/ea-course.jpg",
    link: "/courses/ea",
    fees: "₹45,000",
    rating: 5,
    isLive: true
  },
  {
    id: 11,
    title: "UK Taxation & Accounting",
    category: "UK Taxation",
    thumbnail: "/assets/img/ccge-course-thumbnails/uk-taxation-accounting.jpg",
    link: "/courses/uk-taxation-accounting",
    fees: "₹25,000",
    rating: 5,
    isLive: true
  }
];

// Course data for search - Live Courses Only
const courseData = [
  { id: 7, title: "EA Course", link: "/courses/ea", category: "US Taxation & Accounting", isLive: true },
  { id: 11, title: "UK Taxation & Accounting", link: "/courses/uk-taxation-accounting", category: "UK Taxation", isLive: true },
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
                                 <h3 className="tp-search-course-title">🎥 LIVE COURSES</h3>
                                 <div className="row">
                                    {ccge_live_courses.map((item) => (
                                       <div key={item.id} className="col-xl-6 col-lg-6 col-sm-6">
                                          <div className="tp-search-course-item mb-30">
                                             <div className="tp-search-course-thumb mb-5" style={{ position: 'relative' }}>
                                                <Link href={item.link} onClick={onHide}>
                                                   <Image src={item.thumbnail} alt={item.title} width={280} height={157} />
                                                </Link>
                                                {/* Live Badge */}
                                                <div style={{
                                                   position: 'absolute',
                                                   top: '10px',
                                                   right: '10px',
                                                   background: 'linear-gradient(135deg, #FF3B3B 0%, #FF6B6B 100%)',
                                                   color: '#FFFFFF',
                                                   padding: '6px 12px',
                                                   borderRadius: '20px',
                                                   fontSize: '11px',
                                                   fontWeight: '700',
                                                   textTransform: 'uppercase',
                                                   letterSpacing: '0.5px',
                                                   boxShadow: '0 4px 15px rgba(255, 59, 59, 0.4)',
                                                   display: 'flex',
                                                   alignItems: 'center',
                                                   gap: '5px',
                                                   animation: 'pulse 2s infinite'
                                                }}>
                                                   <span style={{
                                                      width: '6px',
                                                      height: '6px',
                                                      background: '#FFFFFF',
                                                      borderRadius: '50%',
                                                      display: 'inline-block',
                                                      animation: 'blink 1.5s infinite'
                                                   }}></span>
                                                   Live
                                                </div>
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
                                                     {item.title}
                                                   </Link>
                                                </h4>
                                                <div className="tp-search-course-price">
                                                   <span>{item.fees}</span>
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
