import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import BottomPage from "./BottomPage";
import { FirstSectionHtml } from "./Sections/FirstSection";
import FourthSection from "./Sections/FourthSection";
import SecondSection from "./Sections/SecondSection";
import ThirdSection from "./Sections/ThirdSection";
import { useDispatch } from "react-redux";
import _ from "lodash";
import FifthSection from "./Sections/FifthSection";
import FooterSection from "./Sections/FooterSection";

const ScrollArea = forwardRef((props, ref) => {
  const scrollAreaRef = useRef(null);
  const bottomElementRef = useRef(null);
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);
  const fourthSectionRef = useRef(null);
  const fifthSectionRef = useRef(null);
  const footerSectionRef = useRef(null);
  const domStateRef = useRef({
    scrollTop: 0,
    normalizedScrollTop: 0,
    threshold: 9,
    mouse: [0, 0],
  })

  useImperativeHandle(ref, () => ({
    scrollAreaRef,
    bottomElementRef,
    firstSectionRef,
    secondSectionRef,
    thirdSectionRef,
    fourthSectionRef,
    fifthSectionRef,
    footerSectionRef,
    domStateRef
  }));

  // Calculate maxScroll based on the scrollable content's height
  const getMaxScroll = () => window.innerHeight * 3; // 400vh

  const maxScrollRef = useRef(getMaxScroll());
  const ticking = useRef(false);

  // Handler to update top and normalizedTop
  const onScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const maxScroll = maxScrollRef.current;

    // Calculate normalizedTop, clamped between 0 and 1
    const normalizedTop = Math.min(scrollTop / maxScroll, 1);

    // Dispatch actions to update Redux store
    domStateRef.current.scrollTop = scrollTop;
    domStateRef.current.normalizedScrollTop = normalizedTop;
  };

  // Initial dispatch to set top and normalizedTop on mount
  useEffect(() => {
    if (scrollAreaRef.current) {
      onScroll({ target: scrollAreaRef.current });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerMove = (e) => {
    domStateRef.current.mouse = [
      (e.clientX / window.innerWidth) * 2 - 1,
      (e.clientY / window.innerHeight) * 2 - 1,
    ];
  };

  return (
    <div
      className="scrollArea"
      ref={scrollAreaRef}
      onScroll={onScroll}
      onPointerMove={onPointerMove}
    >
      <div style={{ width: "100vw", zIndex: "1000" }}>
        <FirstSectionHtml ref={firstSectionRef} />
        <SecondSection ref={secondSectionRef} />
        <ThirdSection ref={thirdSectionRef} />
        <FourthSection ref={fourthSectionRef} />
        <BottomPage
          ref={bottomElementRef}
          scrollAreaRef={scrollAreaRef}
          elementBeforeRef={fourthSectionRef}
          positionTop={"400vh"}
        />
        <FifthSection ref={fifthSectionRef} scrollAreaRef={scrollAreaRef} />
        <FooterSection ref={footerSectionRef} />
      </div>
    </div>
  );
});

export default ScrollArea;
