import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "primereact/button";
import SoFar from "../../assets/images/so-far.jpeg";

import {
  Slide,
  Fade,
  JackInTheBox,
  Roll,
  Zoom,
  Bounce,
} from "react-awesome-reveal";
import ContactUs from "./ContactUs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const FifthSection = forwardRef(({ scrollAreaRef },ref) => {
  const fifthElementContainerRef = useRef();

  useImperativeHandle(ref, () => fifthElementContainerRef.current);

  useGSAP(() => {
    gsap.set(fifthElementContainerRef.current, { opacity: 0 });

    gsap.to(fifthElementContainerRef.current, {
      scale:1,
      opacity: 0.75,
      duration: 1, // ad00", // when sticky element hits top of the viewport
      scrub: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: fifthElementContainerRef.current,
        start: "=2500",
        scrub: 1, // smooth scrolling effect
        markers: false, // set true to visualize start and end markers
      },
    });

    gsap.to(fifthElementContainerRef.current, {
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: fifthElementContainerRef.current,
        start: "top top", // when sticky element hits top of the viewport
        end: "+=3000",
        pin: true, // pin the element in place
        scrub: 1, // smooth scrolling effect
        markers: false, // set true to visualize start and end markers
      },
    });
  }, {});

  return (
    <div
      ref={fifthElementContainerRef}
      className="row justify-content-center align-content-center vw-100 vh-100"
      style={{
        position: "absolute",
        top: "900vh",
        background: "linear-gradient(to bottom, #4096ee 0%, #39ced6 100%)",
      }}
    >
      <ContactUs />
    </div>
  );
});

export default FifthSection;
