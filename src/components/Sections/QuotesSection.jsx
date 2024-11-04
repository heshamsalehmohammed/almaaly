import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { Helmet } from "react-helmet";
import "./QuotesSection.css";
import {gsap,ScrollTrigger} from "../../gsapSetup";


const Quote = forwardRef(({ img, text, author, title ,className}, ref) => {
  return (
    <div
      ref={ref}
      className={`quote ${className} row justify-content-center align-items-center flex-sm-row px-0 px-sm-5 py-3 py-sm-5 mb-5`}
      style={{
        backgroundColor: "#fff",
        borderRadius: "25px",
        position: "absolute",
      }}
    >
      <div className="col-10 col-md-6">
        <div className="quotes-quote-container w-100 h-100 text-dark d-flex flex-column justify-content-center align-items-center">
          <div className="mb-4 fs-1">
            <i className="fa-solid fa-quote-right"></i>
          </div>
          <div className="mb-4 fs-2 display-6">{text}</div>
          <div style={{ opacity: "0.7" }}>
            {author}, {title}
          </div>
        </div>
      </div>
      <div className="col-10 col-md-6">
        <div className="quotes-img-container mt-3 mt-sm-0 mb-3 mb-sm-0">
          <img src={img} alt="quote person" />
        </div>
      </div>
    </div>
  );
});

const QuotesSection = forwardRef(({ scrollAreaRef, config }, ref) => {
  const quotesSectionRef = useRef(null);
  const quote1Ref = useRef(null);
  const quote2Ref = useRef(null);
  const quote3Ref = useRef(null);
  const quote4Ref = useRef(null);

  const quotes = config.school.quotes;

  useImperativeHandle(ref, () => quotesSectionRef.current);

  useEffect(() => {

    // Animate quote 1
    gsap.to(quote1Ref.current, {
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote1Ref.current,
        start: "center center",
        endTrigger: quote4Ref.current,
        end: "center center",
        pin: true,
        pinType: window.matchMedia('(max-width: 767px)').matches ? 'fixed' : undefined,
        fastScrollEnd: window.matchMedia('(max-width: 767px)').matches ? true : undefined,
        pinSpacing: true,
        markers: false,
      },
    });
  
    gsap.to(quote1Ref.current, {
      scale: 0.8,
      duration: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote2Ref.current,
        start: "top 80%",
        scrub: 1,
        markers: false,
      },
    });
  
    // Animate quote 2
    gsap.to(quote2Ref.current, {
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote2Ref.current,
        start: "center center",
        endTrigger: quote4Ref.current,
        end: "center center",
        pin: true,
        pinSpacing: true,
        pinType: window.matchMedia('(max-width: 767px)').matches ? 'fixed' : undefined,
        fastScrollEnd: window.matchMedia('(max-width: 767px)').matches ? true : undefined,
        markers: false,
      },
    });
  
    gsap.to(quote2Ref.current, {
      scale: 0.8,
      duration: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote3Ref.current,
        start: "top 80%",
        scrub: 1,
        markers: false,
      },
    });
  
    // Animate quote 3
    gsap.to(quote3Ref.current, {
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote3Ref.current,
        start: "center center",
        endTrigger: quote4Ref.current,
        end: "center center",
        pin: true,
        pinSpacing: true,
        pinType: window.matchMedia('(max-width: 767px)').matches ? 'fixed' : undefined,
        fastScrollEnd: window.matchMedia('(max-width: 767px)').matches ? true : undefined,
        markers: false,
      },
    });
  
    gsap.to(quote3Ref.current, {
      scale: 0.8,
      duration: 1,
      scrollTrigger: {
        scroller: scrollAreaRef.current,
        trigger: quote4Ref.current,
        start: "top 80%",
        scrub: 1,
        markers: false,
      },
    });
  
    // Refresh ScrollTrigger to ensure it picks up all animations
    ScrollTrigger.refresh();
  
    // Cleanup function to kill all ScrollTriggers when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollAreaRef, ref]);

  return (
    <>
      <div
        ref={quotesSectionRef}
        className="row justify-content-center vw-100 quotes-section"
        style={{
          position: "relative",
        }}
      >
        <div className="container mt-0 p-0 ">
          <div className="row justify-content-center text-center mt-5 mt-sm-0 ms-0 me-0 px-3">
            <div
              className="col-11 col-sm-10 col-md-9 col-lg-8 col-xl-7"
              style={{ position: "relative" }}
            >
              <Quote
                ref={quote1Ref}
                img={quotes[0].img}
                text={quotes[0].text}
                author={quotes[0].author}
                title={quotes[0].title}
                className='quote-1'
              />
              <Quote
                ref={quote2Ref}
                img={quotes[1].img}
                text={quotes[1].text}
                author={quotes[1].author}
                title={quotes[1].title}
                className='quote-2'
              />
              <Quote
                ref={quote3Ref}
                img={quotes[2].img}
                text={quotes[2].text}
                author={quotes[2].author}
                title={quotes[2].title}
                className='quote-3'
              />
              <Quote
                ref={quote4Ref}
                img={quotes[3].img}
                text={quotes[3].text}
                author={quotes[3].author}
                title={quotes[3].title}
                className='quote-4'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default QuotesSection;
