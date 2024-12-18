import AnimatedCanvas from "./AnimatedCanvas";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile01 from "../assets/images/profile-01.jpg";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useGSAP } from "@gsap/react";

ScrollTrigger.config({
  autoRefreshEvents: "resize,orientationchange",
});
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// Register the ScrollTrigger plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

const MainYouTubeEmbedWithAnimation = forwardRef(({ videoId }, ref) => {
  const videoResponsive = useRef();

  useImperativeHandle(ref, () => videoResponsive.current);

  useGSAP(() => {
    if (!videoResponsive.current) return;
    gsap.fromTo(
      videoResponsive.current,
      {
        y: 150,
      },
      {
        y: 0,
        ease: "elastic.out(1,1)",
        duration: 1.5,
        scrollTrigger: {
          trigger: videoResponsive.current,
          start: "top bottom",
          end: "top 60%",
          toggleActions: "play none none reset",
          // markers:true
        },
      }
    );

    gsap.fromTo(
      videoResponsive.current,
      {
        scale: 1,
      },
      {
        scale: 0.6,
        ease: "none",
        duration: 1.5,
        scrollTrigger: {
          trigger: videoResponsive.current,
          start: "top 40%",
          end: "bottom 10%",
          scrub: true,
          // markers:true
        },
      }
    );
  });

  return (
    <div className="main-video-responsive mt-4" ref={videoResponsive}>
      <iframe
        width="100%"
        height="720"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      />
    </div>
  );
});

const NormalYouTubeEmbedWithAnimation = forwardRef(({ videoId }, ref) => {
  return (
    <div className="normal-video-responsive mt-4" ref={ref}>
      <iframe
        width="100%"
        height="720"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
});

const BottomPage = () => {
  const bottomElementRef = useRef(null); // Reference to the container
  const videoResponsiveRef = useRef(null);
  const mainWorksTitleRef = useRef();
  const mainWorksSubTitleRef = useRef();
  const stickyElementRef = useRef();

  const video1Ref = useRef();
  const video2Ref = useRef();
  const video3Ref = useRef();

  const works = [];

  const videoTitles = {
    video1: "SCARLETT'S PHOTO GALLERY",
    video2: "Bird Conversation Initialive",
    video3: "FUTURE CARTOON MARKETPLACE",
  };

  const [currentWorksSubTitle, setCurrentWorksSubTitle] = useState(
    videoTitles.video1
  );

  const handleScroll = () => {
    if (
      video1Ref.current &&
      video2Ref.current &&
      video3Ref.current &&
      mainWorksSubTitleRef.current
    ) {
      const subtitleRect = mainWorksSubTitleRef.current.getBoundingClientRect();
      const video1Rect = video1Ref.current.getBoundingClientRect();
      const video2Rect = video2Ref.current.getBoundingClientRect();
      const video3Rect = video3Ref.current.getBoundingClientRect();

      // Check if mainWorksSubTitle is currently above each video section
      if (subtitleRect.bottom <= video1Rect.bottom) {
        setCurrentWorksSubTitle(videoTitles.video1);
      } else if (subtitleRect.bottom <= video2Rect.bottom) {
        setCurrentWorksSubTitle(videoTitles.video2);
      } else if (subtitleRect.bottom <= video3Rect.bottom) {
        setCurrentWorksSubTitle(videoTitles.video3);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".bottom-element-text");
      boxes.forEach((box) => {
        gsap.fromTo(
          box,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: box,
              start: "bottom bottom",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          box,
          {
            y: 75,
          },
          {
            y: 0,
            ease: "elastic.out(1,1)",
            scrollTrigger: {
              trigger: box,
              start: "bottom bottom",
              end: "bottom 90%",
              toggleActions: "play none none reset",
              // markers:true
            },
          }
        );
      });

      gsap.to(bottomElementRef.current, {
        "--gradient-start": "#F7F6F5", // Transition to white
        "--gradient-end": "#F7F6F5", // Transition to white
        ease: "none",
        scrollTrigger: {
          trigger: videoResponsiveRef.current, // Use the video-responsive as the trigger
          start: "bottom 80%", // When the trigger's bottom reaches 50% of the viewport
          end: "bottom top", // When the trigger's top reaches the top of the viewport
          scrub: true, // Links the animation progress to the scrollbar
          // markers: true,       // Uncomment for debugging
        },
      });

      gsap.to(stickyElementRef.current, {
        scrollTrigger: {
          trigger: stickyElementRef.current,
          start: "top top", // when sticky element hits top of the viewport
          end: "+=2350", // you can adjust this value based on how long you want it to stay sticky
          pin: true, // pin the element in place
          /* pinSpacing: false, // removes space while the element is pinned */
          scrub: 1, // smooth scrolling effect
          markers: false, // set true to visualize start and end markers
        },
      });
    },
    { scope: bottomElementRef }
  );

  /* 
  useGSAP(
    () => {
      const chars = bottomElementRef.current.querySelectorAll(".works-subtitle-char");

      // Stage 1: Initial fade-in for each character with random delay
      const stage1Timeline = gsap.timeline();
  
      stage1Timeline.fromTo(
        chars,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: () => Math.random() * 1, // Random delay up to 1 second
          stagger: 0.05, // Small stagger between each character animation
          ease: "power1.out"
        }
      );
  
      // Stage 2: Infinite animation from opacity 1 to 0 and back to 1 independently
      chars.forEach((char) => {
        gsap.fromTo(
          char,
          { opacity: 1 },
          {
            opacity: 0.5,
            duration: 0.2,
            delay: Math.random() * 0.5, // Random delay up to 1 second
            repeat: -1, // Infinite repetition
            repeatDelay: 2, // 1-second delay between each animation cycle
            yoyo: true, // Animate back to opacity 1
            ease: "power1.inOut"
          }
        );
      });
    },
    { scope: bottomElementRef,dependencies:[currentWorksSubTitle] }
  ); */

  useGSAP(
    () => {
      const chars = bottomElementRef.current.querySelectorAll(
        ".works-subtitle-char"
      );
      const animationList = [];
      let completedAnimation = 0;

      const onIndevidualAnimationComplete = (index) => {
        completedAnimation++;
        if (completedAnimation === animationList.length) {
          setTimeout(() => {
            completedAnimation = 0; // Reset count for the next cycle
            animationList.forEach((anim) => {
              anim.delay(Math.random() * 2); // Reapply random delay on each restart
              anim.restart(true, true); // Restart with initial delay and yoyo effect
            });
          }, 3000); // 1-second delay before the next cycle starts
        }
      };

      // Stage 2: Infinite animation from opacity 1 to 0 and back to 1 independently
      chars.forEach((char, index) => {
        const animation = gsap.fromTo(
          char,
          { opacity: 0.5 },
          {
            opacity: 1,
            duration: Math.random() * 0.5,
            delay: Math.random() * 1, // Initial random delay up to 1 second
            yoyo: true, // Animate back to opacity 1
            ease: "power1.inOut",
            paused: true, // Start paused to control animation timing
            onComplete: onIndevidualAnimationComplete,
            onCompleteParams: [index],
          }
        );
        animationList.push(animation);
        animation.play(); // Start the animation once
      });
    },
    { scope: bottomElementRef, dependencies: [currentWorksSubTitle] }
  ); /**/

  return (
    <>
      <div className="bottom-element pt-5" ref={bottomElementRef}>
        <div className="d-flex w-100 flex-column text-white text-start mb-2 p-5">
          {[
            "An AI web designer & developer by your side.",
            "With support from three amazing assistants, I can bring your ideal website to life.",
            "Let's start chatting!",
          ].map((text, index) => (
            <div
              className="bottom-element-text font-poppins-semi-bold-italic "
              key={index}
            >
              <div>
                <h1 className="py-4 display-6 display-md-4 display-xl-3 text-transform-none">
                  {text}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div className="row w-100 p-3 mt-3 mb-5 justify-content-center">
          <div className="col-10 col-md-8 col-lg-7">
            <MainYouTubeEmbedWithAnimation
              videoId="dQw4w9WgXcQ"
              ref={videoResponsiveRef}
            />
          </div>
        </div>
        <div
          className="row w-100 min-vh-100 w-100 p-3 mt-6  justify-content-center"
          ref={stickyElementRef}
        >
          <div className="col-10 col-md-9 col-lg-8">
            <div
              className="bottom-element-text mt-5 pb-3 main-works-title"
              ref={mainWorksTitleRef}
            >
              <div>
                <h1 className="py-5 display-6 display-md-5 display-lg-4  display-xl-3 fw-bold text-dark font-protest-strike">
                  My Work
                </h1>
              </div>
            </div>
            <div
              className="bottom-element-text mt-5 py-5 main-works-subtitle"
              ref={mainWorksSubTitleRef}
            >
              <div>
                <h1 className="py-5 display-1  display-xl-1 fw-bold text-dark font-anton ls-4">
                  {currentWorksSubTitle.split("").map((char, index) => (
                    <span key={index} className="works-subtitle-char">
                      {char}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="position-relative w-100">
          <div className="row p-3 mt-5 mb-5 pt-5 pb-5 justify-content-center">
            <div className="col-8 col-md-6 col-lg-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation
                videoId="dQw4w9WgXcQ"
                ref={video1Ref}
              />
            </div>
          </div>
          <div className="row p-3 mt-5 mb-5  pt-5 pb-5 justify-content-center">
            <div className="col-8 col-md-6 col-lg-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation
                videoId="dQw4w9WgXcQ"
                ref={video2Ref}
              />
            </div>
          </div>
          <div className="row p-3 mt-5 mb-5  pt-5 pb-5 justify-content-center">
            <div className="col-8 col-md-6 col-lg-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation
                videoId="dQw4w9WgXcQ"
                ref={video3Ref}
              />
            </div>
          </div>
        </div>

        <WhatTheySay />
      </div>
    </>
  );
};

const DURATION = 25000;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
  const innerRef = useRef(null);


  return (
    <div
      className="loop-slider"
      style={{
        "--duration": `${duration}ms`,
        "--direction": reverse ? "reverse" : "normal",
      }}
    >
      <div className="inner" ref={innerRef}>
        {children}
        {children}
      </div>
    </div>
  );
};

const TestimonialItem = ({ img, name, text, role }) => {
  
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
  };

  return (
    <div
      className="testimonial-item ms-2 me-2 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="client-row">
        <img src={img} className="rounded-circle" alt={`profile ${name}`} />
      </div>
      <div className="testimonial-content">
        <h4>{name}</h4>
        <p>"{text}"</p>
        <span>{role}</span>
      </div>
    </div>
  );
};

export const WhatTheySay = () => {
  const testimonials = [
    {
      name: "Sandar",
      role: "Managing Director",
      img: profile01,
      text: "Ut varius leo eu mauris lacinia, eleifend posuere urna gravida. Aenean a mattis lacus.",
    },
    {
      name: "Shinn",
      role: "CEO and Founder",
      img: profile01,
      text: "Nam iaculis, leo nec facilisis sollicitudin, dui massa tempus odio, vitae malesuada ante elit vitae eros.",
    },
    {
      name: "Marlar",
      role: "Chief Marketing Officer",
      img: profile01,
      text: "Etiam efficitur, tortor facilisis finibus semper, diam magna fringilla lectus, et fringilla felis urna posuere tortor.",
    },
    {
      name: "Hesham",
      role: "Chief Marketing Officer",
      img: profile01,
      text: "Etiam efficitur, tortor facilisis finibus semper, diam magna fringilla lectus, et fringilla felis urna posuere tortor.",
    },
  ];

  return (
    <div className="position-relative w-100">
      <div className="row mr-0 ml-0 min-vh-100 p-3 mt-6 justify-content-center bg-dark">
        <div className="col-md-7 col-10 pt-4">
          <div className="bottom-element-text font-poppins-semi-bold-italic mt-5 pt-5">
            <h1 className="mt-5 py-4 display-6 display-md-4 display-xl-3 text-transform-none">
              What do creators say about Almaaly
            </h1>
          </div>
        </div>
        <div className="col-12 what-they-say-menu">
          <InfiniteLoopSlider
            duration={random(DURATION - 5000, DURATION + 5000)}
            reverse={false}
          >
            {shuffle(testimonials)
              .slice(0, TAGS_PER_ROW)
              .map((item, index) => (
                <TestimonialItem
                  key={`testimonial-item${index}`}
                  img={item.img}
                  name={item.name}
                  text={item.text}
                  role={item.role}
                />
              ))}
          </InfiniteLoopSlider>
        </div>
      </div>
    </div>
  );
};
export default BottomPage;
