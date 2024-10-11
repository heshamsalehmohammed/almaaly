import { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";
import ContactUs from "./Sections/ContactUs";
import ReactPageScroller from "../packages/PageScroll/ReactPageScroller";
import SocialIcons from "./SocilaIcons";
import Section6 from "./Sections/Section6";

const FullpageSections = () => {
    const { currentPage, setCurrentPage, pageScrollerRef } =
      useContext(PageContext);
  
    const handlePageChange = (number) => {
      setCurrentPage(number);
      console.log("Page changed to:", number);
    };
  
    const handleBeforePageChange = (number) => {
      console.log("Before scrolling to page:", number);
    };
  
    return (
      <div className="full-page-content">
        <ReactPageScroller
          ref={pageScrollerRef}
          pageOnChange={handlePageChange}
          onBeforePageScroll={handleBeforePageChange}
          customPageNumber={currentPage}
          animationTimer={500}
          animationTimerBuffer={0}
        >
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6/>
          <ContactUs />
        </ReactPageScroller>
        <SocialIcons />
      </div>
    );
  };


  export default FullpageSections;