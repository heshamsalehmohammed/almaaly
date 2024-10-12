import AnimatedCanvas from "./AnimatedCanvas";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

// Register the ScrollTrigger plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

const YouTubeEmbed = ({ videoId }) => {
  const videoResponsive = useRef();

  useGSAP(
    () => {
      gsap.fromTo(
        videoResponsive.current,
        {
          y: 150,
        },
        {
          y: 0,
          ease: "elastic.out(1,1)",
          duration:1.5,
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
          duration:1.5,
          scrollTrigger: {
            trigger: videoResponsive.current,
            start: "top 40%",
            end: "bottom 10%",
            scrub: true,
            // markers:true
          },
        }
      );
    }
  );

  return (
    <div className="video-responsive mt-4" ref={videoResponsive}>
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
  const bottomElementTextContainer = useRef();

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
    },
    { scope: bottomElementTextContainer }
  );

  return (
    <>
      <div className="bottom-element pt-5">
        <div
          className="d-flex flex-column text-white text-start mb-2 p-5"
          ref={bottomElementTextContainer}
        >
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
        <div className="row p-3 mt-3 justify-content-center">
          <div className="col-10 col-md-8 col-lg-7">
            <YouTubeEmbed videoId="dQw4w9WgXcQ" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomPage;
