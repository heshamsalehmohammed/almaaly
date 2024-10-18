import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import mouseScroll from "../../assets/images/mouse-scroll.png";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const RotatingText = () => {
  useEffect(() => {
    const words = document.querySelectorAll('.word');
    words.forEach((word) => {
      const letters = word.textContent.split('');
      word.textContent = '';
      letters.forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter';
        word.append(span);
      });
    });

    let currentWordIndex = 0;
    const maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = '1';

    const rotateText = () => {
      const currentWord = words[currentWordIndex];
      const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

      Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
          letter.className = 'letter out';
        }, i * 80);
      });

      nextWord.style.opacity = '1';
      Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = 'letter behind';
        setTimeout(() => {
          letter.className = 'letter in';
        }, 340 + i * 80);
      });

      currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    rotateText();
    const intervalId = setInterval(rotateText, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mb-3 rotating-text fs-2 d-flex justify-content-center align-items-center flex-md-wrap">
      <p className="me-2">Our School is</p>
      <p className="text-uppercase glow1">
        <span className="word ">awesome.</span>
        <span className="word ">beautiful.</span>
        <span className="word ">creative.</span>
        <span className="word ">fabulous.</span>
        <span className="word ">interesting.</span>
      </p>
    </div>
  );
};

const Section1 = () => {
  const sectionRef = useRef(null);
  const welcomeBoxRef = useRef(null);
  const descriptionRef1 = useRef(null);
  const descriptionRef2 = useRef(null);
  const scrollDownRef = useRef(null);

  useGSAP(
    () => {



      const tl = gsap.timeline();

      // Animate Welcome Titles
      tl
        // Animate First Description Paragraph
        .fromTo(
          descriptionRef1.current,
          {
            y: '70px',
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1,0.75)",
          }
        )
        // Animate Second Description Paragraph
        .fromTo(
          descriptionRef2.current,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1,0.75)",
          },
          "-=0.6"
        )
        // Animate Scroll Down Indicator
        .fromTo(
          scrollDownRef.current,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1,0.75)",
          },
          "-=0.6"
        );
    },
    { scope: sectionRef } // Scope the animations to sectionRef
  );


  return (
    <div
      className="section d-flex flex-column justify-content-center align-items-center position-relative"
      style={{ height: "100vh", width: "100%" }}
      ref={sectionRef}
    >
      {/* Welcome Box */}
      <div className="col-12 text-center" ref={welcomeBoxRef}>
        <div className="welcome-box">
          {/* <RotatingText /> */}
          <div className="">
            <span className="coumpany-name display-1 welcome-title">A</span>
            <span className="coumpany-name display-1 welcome-title">L</span>
            <span className="coumpany-name display-1 welcome-title">M</span>
            <span className="coumpany-name display-1 welcome-title">A</span>
            <span className="coumpany-name display-1 welcome-title">A</span>
            <span className="coumpany-name display-1 welcome-title">L</span>
            <span className="coumpany-name display-1 welcome-title">Y</span>
          </div>

          <p
            className="col-md-6 desc pt-2 pb-0 mt-4 mb-1 pe-sm-0 pe-5"
            ref={descriptionRef1}
          >
            El Maaly International School offers a modern, engaging learning
            environment designed to inspire students. With a dynamic approach to
            education,
          </p>
          <p
            className="col-md-5 desc pt-0 pe-sm-0 pe-5"
            ref={descriptionRef2}
          >
            We are dedicated to empowering young minds for a bright future. Join us in creating a foundation for lifelong success.
          </p>
        </div>
      </div>

      {/* Scroll Down */}
      <div
        className="col-12 position-absolute bottom-0 start-50 translate-middle-x mb-3"
        ref={scrollDownRef}
      >
        <div className="scroll-down d-flex flex-column align-items-center">
          <img src={mouseScroll} alt="Scroll Down" />
          <span className="mt-3">Scroll Down</span>
        </div>
      </div>
    </div>
  );
};

export default Section1;
