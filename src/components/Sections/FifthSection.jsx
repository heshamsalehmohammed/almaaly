import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
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

const FifthSection = forwardRef(({ scrollAreaRef,threeSceneRef },ref) => {
  const fifthElementContainerRef = useRef();

  useImperativeHandle(ref, () => fifthElementContainerRef.current);

  useGSAP(() => {
/*     ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 1024px)": function () { */
        // Set initial opacity
        gsap.set(fifthElementContainerRef.current, { opacity: 0 });
   
        // Animation 1: Opacity animation
        gsap.to(fifthElementContainerRef.current, {
          opacity: 0.75,
          duration: 1,
          scrub: 1,
          scrollTrigger: {
            scroller: scrollAreaRef.current,
            trigger: fifthElementContainerRef.current,
            start: `+=${window.innerHeight-10}`,
            scrub: 1,
            markers: false,
          },
        });
  
        // Animation 2: Pinning element
        gsap.to(fifthElementContainerRef.current, {
          scrollTrigger: {
            scroller: scrollAreaRef.current,
            trigger: fifthElementContainerRef.current,
            start: "top top",
            end: `+=${window.innerHeight}`,
            pin: true,
            scrub: 1,
            markers: false,
          },
        });
/*       },
  
      // Mobile
      "(max-width: 1023px)": function () {
        gsap.set(fifthElementContainerRef.current, { opacity: 0.75 });
        // No animation on mobile
        // Optionally, you can reset styles or add mobile-specific animations here
      }
    }); */
  }, []);

  return (
    <div
      ref={fifthElementContainerRef}
      className="row justify-content-center align-content-center vw-100 p-0 m-0"
      style={{
        minHeight: `${100}vh`,
/*         marginTop:`${100}vh`, */
        background: "linear-gradient(to bottom, #4096ee 0%, #39ced6 100%)",
      }}
    >
      <ContactUs />
    </div>
  );
});

export default FifthSection;
