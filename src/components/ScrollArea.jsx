import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef } from "react";
import BottomPage from "./BottomPage";
import { FirstSectionHtml } from "./Sections/FirstSectionHtml";
import FourthSection from "./Sections/FourthSection";
import SecondSection from "./Sections/SecondSection";
import ThirdSection from "./Sections/ThirdSection";
import FifthSection from "./Sections/FifthSection";
import FooterSection from "./Sections/FooterSection";
import StudentsGallarySection from "./Sections/StudentsGallarySection";
import QuotesSection from "./Sections/QuotesSection";

const ScrollArea = forwardRef(({threeSceneRef,headerRef}, ref) => {
  const scrollAreaRef = useRef(null);
  const bottomElementRef = useRef(null);
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);
  const studentsGallarySectionRef = useRef(null);
  const quotesSectionRef = useRef(null)
  const fourthSectionRef = useRef(null);
  const fifthSectionRef = useRef(null);
  const footerSectionRef = useRef(null);
  const domStateRef = useRef({
    scrollTop:0,
    normalizedScrollTop: 0,
    scrollableHeight: 0,
    scrollHeight:0,
    clientHeight:0,
    domPages: 0,
    mouse: [0, 0],
  })

  useLayoutEffect(() => {
    domStateRef.current.scrollHeight = scrollAreaRef.current.scrollHeight;
    domStateRef.current.clientHeight = scrollAreaRef.current.clientHeight;
    domStateRef.current.scrollableHeight = scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight
    domStateRef.current.domPages = scrollAreaRef.current.scrollHeight / scrollAreaRef.current.clientHeight
  }, []);


  useImperativeHandle(ref, () => ({
    scrollAreaRef,
    bottomElementRef,
    firstSectionRef,
    secondSectionRef,
    thirdSectionRef,
    studentsGallarySectionRef,
    fourthSectionRef,
    quotesSectionRef,
    fifthSectionRef,
    footerSectionRef,
    domStateRef
  }));

  // Handler to update top and normalizedTop
  const onScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const normalizedTop = Math.min(scrollTop / domStateRef.current.scrollableHeight, 1);
    domStateRef.current.scrollTop = scrollTop;
    domStateRef.current.normalizedScrollTop = normalizedTop;
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      onScroll({ target: scrollAreaRef.current });
    }
  }, []);

  const onPointerMove = (e) => {
    domStateRef.current.mouse = [
      (e.clientX / window.innerWidth) * 2 - 1,
      (e.clientY / window.innerHeight) * 2 - 1,
    ];
  };


  const handleResize =() => {
    domStateRef.current.scrollHeight = scrollAreaRef.current.scrollHeight;
    domStateRef.current.clientHeight = scrollAreaRef.current.clientHeight;
    domStateRef.current.scrollableHeight = scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight
    domStateRef.current.domPages = scrollAreaRef.current.scrollHeight / scrollAreaRef.current.clientHeight
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="scrollArea"
      ref={scrollAreaRef}
      onScroll={onScroll}
      onPointerMove={onPointerMove}
    >
      <div style={{ width: "100vw", zIndex: "1000" }}>
        <FirstSectionHtml ref={firstSectionRef} headerRef={headerRef}/>
        <SecondSection ref={secondSectionRef} />
        <ThirdSection ref={thirdSectionRef} />
        <StudentsGallarySection ref={studentsGallarySectionRef} scrollAreaRef={scrollAreaRef} />
        <FourthSection ref={fourthSectionRef} />
        <QuotesSection ref={quotesSectionRef} scrollAreaRef={scrollAreaRef}/>
        <BottomPage
          ref={bottomElementRef}
          scrollAreaRef={scrollAreaRef}
          elementBeforeRef={fourthSectionRef}
          positionTop={"400vh"}
        />
        <FifthSection ref={fifthSectionRef} scrollAreaRef={scrollAreaRef} threeSceneRef={threeSceneRef}/>
        <FooterSection ref={footerSectionRef} />
      </div>
    </div>
  );
});

export default ScrollArea;
