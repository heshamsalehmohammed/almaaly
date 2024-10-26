import React, { forwardRef, useLayoutEffect, useRef } from "react";
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
import "./StudentsGallarySection.css";

import student1 from "../../assets/images/student-1.png";
import student2 from "../../assets/images/student-2.jpg";
import student3 from "../../assets/images/student-3.jpg";
import student4 from "../../assets/images/student-4.jpg";
import student5 from "../../assets/images/student-5.jpg";
import student6 from "../../assets/images/student-6.jpg";
import student7 from "../../assets/images/student-7.jpg";
import student8 from "../../assets/images/student-8.jpg";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const StudentsGallarySection = forwardRef(({ scrollAreaRef }, ref) => {
  const studentsGallary = [
    { img: student1 },
    { img: student2 },
    { img: student3 },
    { img: student4 },
    { img: student5 },
    { img: student6 },
    { img: student7 },
    { img: student8 },
  ];

  const imageRefs = useRef([]);
  imageRefs.current = [];

  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const calculateAnimationPropsBasedOnMEdiaQuery = (animationProps) => {
    if (window.innerWidth > 1200)
      return animationProps;

    const scaleFactor = (window.innerWidth / 1200) * 1.3;
    let scale = animationProps.scale * scaleFactor;


    return {
      ...animationProps,
      scale
    };
  };

  useGSAP(() => {
    let ctx = gsap.context(() => {
      imageRefs.current.forEach((imageRef) => {
        gsap.set(imageRef, {
          scale: 1,
          x: window.innerWidth/2 - imageRef.offsetWidth /2 ,
          y: window.innerHeight/2- imageRef.offsetHeight /4
        });
      });
/**/ 
      imageRefs.current.forEach((imageRef, index) => {
        let animationProps = {};

        switch (index) {
          case 0:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              x: 0,
              y: 0,
            });
            break;
/*           case 1:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.85,
              xPercent: 50,
              yPercent: -100,
            });
            break;
          case 2:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              xPercent: -150,
              yPercent: 10,
            });
            break;
          case 3:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.85,
              xPercent: 50,
              yPercent: 10,
            });
            break;

          case 4:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.75,
              xPercent: -70,
              yPercent: -100,
            });
            break;
          case 5:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              xPercent: 5,
              yPercent: -50,
            });
            break;
          case 6:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              xPercent: -100,
              yPercent: -15,
            });
            break;
          case 7:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              xPercent: -40,
              yPercent: 10,
            });
            break; */
        }

        gsap.to(imageRef, {
          ...animationProps,
          scrollTrigger: {
            trigger: ref.current,
            scroller: scrollAreaRef.current || window,
            start: "center bottom",
            end: "+=500",
            scrub: true,
          },
        });
      }); 
    }, imageRefs);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="row  student-gallary-section vw-100 vh-100"
      style={{
        position: "relative",
      }}
    >
      {studentsGallary.map((item, index) => {
        return (
          <div
            key={`student-gallary-img-${index}`}
            className="student-gallary-img-container p-0"
            ref={addToRefs}
          >
            <img src={item.img} />
          </div>
        );
      })}
    </div>
  );
});

export default StudentsGallarySection;
