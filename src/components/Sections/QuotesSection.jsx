import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
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
import "./QuotesSection.css";

import quote1 from "../../assets/images/quote-1.jpeg";
import quote2 from "../../assets/images/quote-2.jpg";
import quote3 from "../../assets/images/quote-3.jpg";
import quote4 from "../../assets/images/quote-4.jpg";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Quote = forwardRef(({ img, top }, ref) => {
  return (
    <div
      ref={ref}
      className="row justify-content-center align-items-center flex-sm-row px-0 px-sm-5 py-3 py-sm-5 mb-5"
      style={{
        backgroundColor: "#fff",
        borderRadius: "25px",
        position: "absolute",
        top,
      }}
    >
      <div className=" col-10 col-md-6">
        <div className="quotes-quote-container w-100 h-100 text-dark d-flex flex-column justify-content-center align-items-center">
          <div className="mb-4 fs-1">
            <i className="fa-solid fa-quote-right"></i>
          </div>
          <div className="mb-4 fs-2 display-6">
            Tedy has enabled us to move from employee benefits to a personalized
            wellness experience.
          </div>
          <div className="" style={{opacity: '0.7'}}>Andrew Lockhead, President and Co-founder</div>
        </div>
      </div>
      <div className="col-10 col-md-6">
       
          <img className="quotes-img mt-3 mt-sm-0 mb-3 mb-sm-0" src={img} />
        
      </div>
    </div>
  );
});

const QuotesSection = forwardRef(({ scrollAreaRef }, ref) => {
  const quotesSectionRef = useRef(null);
  const quote1Ref = useRef(null);
  const quote2Ref = useRef(null);
  const quote3Ref = useRef(null);
  const quote4Ref = useRef(null);

  useImperativeHandle(ref, () => quotesSectionRef.current);



  useGSAP(() => {

    setTimeout(()=>{
      gsap.set(quote2Ref.current, {
        position: 'absolute',
        top: `0`,
      });

      gsap.set(quote2Ref.current, {
        position: 'absolute',
        top: `calc(${quote1Ref.current.offsetHeight}px + 10vh)`,
      });

      gsap.set(quote3Ref.current, {
        position: 'absolute',
        top: `calc(${quote1Ref.current.offsetHeight + quote2Ref.current.offsetHeight}px + 20vh)`,
      });

      gsap.set(quote4Ref.current, {
        position: 'absolute',
        top: `calc(${quote1Ref.current.offsetHeight + quote2Ref.current.offsetHeight + quote3Ref.current.offsetHeight}px + 30vh)`,
      });

      gsap.set(quotesSectionRef.current, {

        height: `calc(${quote1Ref.current.offsetHeight + quote2Ref.current.offsetHeight + quote3Ref.current.offsetHeight + quote4Ref.current.offsetHeight}px + 40vh)`,
      });
    },300)


    // animate quote 1

    gsap.to(quote1Ref.current, {
      scrub: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote1Ref.current,
        start: "center center",
        endTrigger: quote4Ref.current,
        end: "center center",
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    gsap.to(quote1Ref.current, {
      scale: 0.8,
      duration: 1,
      scrub: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote2Ref.current,
        start: "top 80%",
        scrub: 1,
        markers: false,
      },
    });

    // animate quote 2

    gsap.to(quote2Ref.current, {
      scrub: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote2Ref.current,
        start: "center center",
        endTrigger: quote4Ref.current,
        end: "center center",
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    gsap.to(quote2Ref.current, {
      scale: 0.8,
      duration: 1,
      scrub: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote3Ref.current,
        start: "top 80%",
        scrub: 1,
        markers: false,
      },
    });

    // animate quote 3

    gsap.to(quote3Ref.current, {
      scrub: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote3Ref.current,
        start: "center center",
        endTrigger: quote4Ref.current,
        end: "center center",
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    gsap.to(quote3Ref.current, {
      scale: 0.8,
      duration: 1,
      scrub: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote4Ref.current,
        start: "top 80%",
        scrub: 1,
        markers: false,
      },
    });
  }, {dependencies:[]});



  return (
    <div
      ref={quotesSectionRef}
      className="row justify-content-center  vw-100"
      style={{
        position: "relative",
      }}
    >
      <div className="container mt-0 p-0 quotes-section">
        <div className="row justify-content-center text-center mt-5 mt-sm-0 ms-0 me-0 px-3">
          <div
            className="col-11 col-sm-10 col-md-9 col-lg-8"
            style={{ position: "relative" }}
          >
            <Quote ref={quote1Ref} img={quote1}  />
            <Quote ref={quote2Ref} img={quote2}  />
            <Quote ref={quote3Ref} img={quote3}  />
            <Quote ref={quote4Ref} img={quote4}  />
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuotesSection;
