import { useCallback, useEffect, useRef, useState } from "react";
import BottomPage from "./BottomPage";
import { FirstSectionHtml } from "./Sections/FirstSection";
import FourthSection from "./Sections/FourthSection";
import SecondSection from "./Sections/SecondSection";
import ThirdSection from "./Sections/ThirdSection";
import { useDispatch } from "react-redux";
import { setMouse, setNormalizedTop, setTop } from "../redux/scrollSlice";
import _ from "lodash";
import FifthSection from "./Sections/FifthSection";
import FooterSection from "./Sections/FooterSection";

const ScrollArea = () => {
  const dispatch = useDispatch();
  const scrollAreaRef = useRef(null);
  const bottomElementRef = useRef(null);
  const fixedElementRef = useRef(null);

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
    dispatch(setTop(scrollTop));
    dispatch(setNormalizedTop(normalizedTop));
  };

  // Initial dispatch to set top and normalizedTop on mount
  useEffect(() => {
    if (scrollAreaRef.current) {
      onScroll({ target: scrollAreaRef.current });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerMove = (e) => {
    dispatch(
      setMouse([
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      ])
    );
  };

  return (
    <div
      className="scrollArea"
      ref={scrollAreaRef}
      onScroll={onScroll}
      onPointerMove={onPointerMove}
    >
      <div style={{ width: "100vw", height: `${9 * 100}vh`, zIndex: "1000" }}>
        <FirstSectionHtml />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <BottomPage ref={bottomElementRef} scrollAreaRef={scrollAreaRef} />
        <FifthSection scrollAreaRef={scrollAreaRef}/>
        <FooterSection />
      </div>
    </div>
  );
};

export default ScrollArea;
