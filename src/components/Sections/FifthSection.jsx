import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";
import ContactUs from "./ContactUs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const FifthSection = forwardRef(({ scrollAreaRef,threeSceneRef,config },ref) => {
  const fifthElementContainerRef = useRef();

  useImperativeHandle(ref, () => fifthElementContainerRef.current);

  useLayoutEffect(()=>{
    if (typeof window === 'undefined') return;

    let ctx = gsap.context(()=>{
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
    })
    return () => ctx.revert();
  },[])

  return (
    <div
      ref={fifthElementContainerRef}
      className="row justify-content-center align-content-center vw-100 p-0 m-0"
      style={{
        minHeight: `${100}vh`,
        background: "linear-gradient(to bottom, #4096ee 0%, #39ced6 100%)",
      }}
    >
      <ContactUs config={config}/>
    </div>
  );
});

export default FifthSection;
