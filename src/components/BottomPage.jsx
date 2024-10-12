import AnimatedCanvas from "./AnimatedCanvas";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const BottomPage = () => {
  const textRefs = useRef([]);

  useEffect(() => {
    textRefs.current.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 50%",
            once:true,
            scrub:true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <>
      {" "}
      <div className="bottom-element pt-5">
        {/*  <AnimatedCanvas>
         
      
      
    </AnimatedCanvas>  */}{" "}
        <div className="d-flex flex-column text-white text-start mb-2 p-5">
          {[
            "An AI web designer & developer by your side.",
            "With support from three amazing assistants, I can bring your ideal website to life.",
            "Let's start chatting!",
          ].map((text, index) => (
            <div
              className=""
              key={index}
              ref={(el) => (textRefs.current[index] = el)}
            >
              <div>
                <h1 className="py-4 display-6 display-md-4 display-xl-3">
                  {text}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomPage;
