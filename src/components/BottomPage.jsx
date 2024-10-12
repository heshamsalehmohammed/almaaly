import AnimatedCanvas from "./AnimatedCanvas";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useGSAP } from "@gsap/react";

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

const NormalYouTubeEmbedWithAnimation = ({ videoId }) => {
  return (
    <div className="normal-video-responsive mt-4">
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
};

const BottomPage = () => {
  const bottomElementRef = useRef(null); // Reference to the container
  const videoResponsiveRef = useRef(null);
  const mainWorksTitleRef = useRef();
  const mainWorksSubTitleRef = useRef();
  const stickyElementRef = useRef();

  const works = [];

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
          end: "+=2000", // you can adjust this value based on how long you want it to stay sticky
          pin: true, // pin the element in place
          /* pinSpacing: false, // removes space while the element is pinned */
          scrub: 1, // smooth scrolling effect
          markers: false, // set true to visualize start and end markers
        },
      });
    },
    { scope: bottomElementRef }
  );

  return (
    <>
      <div className="bottom-element pt-5" ref={bottomElementRef}>
        <div className="d-flex flex-column text-white text-start mb-2 p-5">
          {[
            "An AI web designer & developer by your side.",
            "With support from three amazing assistants, I can bring your ideal website to life.",
            "Let's start chatting!",
          ].map((text, index) => (
            <div className="bottom-element-text" key={index}>
              <div>
                <h1 className="py-4 display-6 display-md-4 display-xl-3">
                  {text}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div className="row p-3 mt-3 mb-5 justify-content-center">
          <div className="col-10 col-md-8 col-lg-7">
            <MainYouTubeEmbedWithAnimation
              videoId="dQw4w9WgXcQ"
              ref={videoResponsiveRef}
            />
          </div>
        </div>
        <div
          className="min-vh-100"
          ref={stickyElementRef}
        >
          <div className="row h-100 w-100 p-3 mt-6  justify-content-center">
            <div className="col-10 col-md-9 col-lg-8">
              <div
                className="bottom-element-text mt-5 pb-3 main-works-title"
                ref={mainWorksTitleRef}
              >
                <div>
                  <h1 className="py-5 display-6 display-md-5 display-lg-4  display-xl-3 fw-bold text-dark">
                    My Work
                  </h1>
                </div>
              </div>
              <div
                className="bottom-element-text mt-5 py-5 main-works-subtitle"
                ref={mainWorksSubTitleRef}
              >
                <div>
                  <h1 className="py-5 display-4 display-md-3 display-lg-2  display-xl-1 fw-bold text-dark">
                    SCARLETT'S PHOTO GALLERY
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-relative">
          <div className="row p-3 mt-5 mb-5 pt-5 pb-5 justify-content-center">
            <div className="col-8 col-md-6 col-lg-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation videoId="dQw4w9WgXcQ" />
            </div>
          </div>
          <div className="row p-3 mt-5 mb-5  pt-5 pb-5 justify-content-center">
            <div className="col-8 col-md-6 col-lg-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation videoId="dQw4w9WgXcQ" />
            </div>
          </div>
          <div className="row p-3 mt-5 mb-5  pt-5 pb-5 justify-content-center">
            <div className="col-8 col-md-6 col-lg-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation videoId="dQw4w9WgXcQ" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomPage;
