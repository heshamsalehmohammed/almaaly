import { useEffect, useRef, useState } from "react";
import BottomPage from "./BottomPage";
import { FirstSectionHtml } from "./Sections/FirstSection";
import FourthSection from "./Sections/FourthSection";
import SecondSection from "./Sections/SecondSection";
import ThirdSection from "./Sections/ThirdSection";
import { useDispatch } from "react-redux";
import { setMouse, setNormalizedTop, setTop } from "../redux/scrollSlice";

const ScrollArea = () => {
  const dispatch = useDispatch();
  const scrollAreaRef = useRef(null);
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

  // Handler for animating the fixed element based on scroll
  const handleScroll = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollTop = scrollAreaRef.current.scrollTop;
        const maxScroll = maxScrollRef.current;
        const clampedScrollTop = Math.min(scrollTop, maxScroll);
        fixedElementRef.current.style.transform = `translateY(-${clampedScrollTop}px)`;
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  // Handler to update maxScroll on window resize
  const handleResize = () => {
    maxScrollRef.current = getMaxScroll();

    // Adjust the transform based on the new maxScroll
    const scrollTop = scrollAreaRef.current.scrollTop;
    const clampedScrollTop = Math.min(scrollTop, maxScrollRef.current);
    fixedElementRef.current.style.transform = `translateY(-${clampedScrollTop}px)`;
  };

  // Set up event listeners for scroll and resize
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      if (scrollArea) {
        scrollArea.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="scrollArea"
      ref={scrollAreaRef}
      onScroll={onScroll}
      onPointerMove={(e) =>
        dispatch(
          setMouse([
            (e.clientX / window.innerWidth) * 2 - 1,
            (e.clientY / window.innerHeight) * 2 - 1,
          ])
        )
      }
    >
      <div style={{ width: "100vw", height: `${4 * 100}vh`, zIndex: "1000" }}>
        <div className="fixed-element">
          <div class="fixed-element-Content" ref={fixedElementRef}>
            <FirstSectionHtml />
            <SecondSection />
            <ThirdSection />
            <FourthSection />
          </div>
        </div>

        <BottomPage />
      </div>
    </div>
  );
};

export default ScrollArea;
