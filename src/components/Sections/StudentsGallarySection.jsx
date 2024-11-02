import { forwardRef, useRef } from "react";
import "./StudentsGallarySection.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**/ const StudentsGallarySection = forwardRef(({ scrollAreaRef,config }, ref) => {
  const studentsGallary = [
    { img: config.school.studentsGalleryImages[0] },
    { img: config.school.studentsGalleryImages[1] },
    { img: config.school.studentsGalleryImages[2] },
    { img: config.school.studentsGalleryImages[3] },
    { img: config.school.studentsGalleryImages[4] },
    { img: config.school.studentsGalleryImages[5] },
    { img: config.school.studentsGalleryImages[6] },
    { img: config.school.studentsGalleryImages[7] },
  ];

  const imageRefs = useRef([]);
  imageRefs.current = [];

  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const calculateAnimationPropsBasedOnMEdiaQuery = (animationProps) => {

    let normalizedX = 1;
    let normalizedY = 1;

    if(window.matchMedia('(min-width: 992px)').matches){
      normalizedX = animationProps.normalizedXtoC
      normalizedY = animationProps.normalizedYtoC
    }else if(window.matchMedia('(min-width: 576px) and (max-width: 991.98px)').matches){
      normalizedX = animationProps.normalizedXtoC_md
      normalizedY = animationProps.normalizedYtoC_md
    }else if(window.matchMedia('(max-width: 575.98px)').matches){
      normalizedX = animationProps.normalizedXtoC_xs
      normalizedY = animationProps.normalizedYtoC_xs
    }


    const xToCenter = normalizedX * window.innerWidth;
    const yToCenter = normalizedY * window.innerHeight;
    return {
      x:xToCenter,
      y:yToCenter,
      scale: animationProps.scale
    };
  };

  useGSAP(() => {
    let ctx = gsap.context(() => {
      imageRefs.current.forEach((imageRef) => {
        gsap.set(imageRef, {
          scale: 1,
          x: window.innerWidth/2 - imageRef.offsetWidth /2 ,
          y: window.innerHeight/2- imageRef.offsetHeight /2
        });
      });

      imageRefs.current.forEach((imageRef, index) => {
        let animationProps = {};

        switch (index) {
          case 0:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              normalizedXtoC: 0.1,
              normalizedYtoC: 0.1757,
              normalizedXtoC_md:0.1,
              normalizedYtoC_md:0.1,
              normalizedXtoC_xs:0.1,
              normalizedYtoC_xs:0.1
            });
            break;
         case 1:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.85,
              normalizedXtoC: 0.6552,
              normalizedYtoC: 0.1337,
              normalizedXtoC_md:0.55,
              normalizedYtoC_md:0.1,
              normalizedXtoC_xs:0.44,
              normalizedYtoC_xs:0.15
            });
            break;
           case 2:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              normalizedXtoC: 0.1,
              normalizedYtoC: 0.669,
              normalizedXtoC_md:0.25,
              normalizedYtoC_md:0.27,
              normalizedXtoC_xs:0.1,
              normalizedYtoC_xs:0.3,
            });
            break;
           case 3:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.85,
              normalizedXtoC: 0.6552,
              normalizedYtoC: 0.6578,
              normalizedXtoC_md:0.5,
              normalizedYtoC_md:0.4,
              normalizedXtoC_xs:0.44,
              normalizedYtoC_xs:0.35,
            });
            break;
          case 4:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.75,
              normalizedXtoC: 0.31667,
              normalizedYtoC: 0.1,
              normalizedXtoC_md:0.05,
              normalizedYtoC_md:0.4,
              normalizedXtoC_xs:0.1,
              normalizedYtoC_xs:0.48          
            });
            break;
          case 5:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              normalizedXtoC: 0.4625,
              normalizedYtoC: 0.1914,
              normalizedXtoC_md:0.6,
              normalizedYtoC_md:0.6,
              normalizedXtoC_xs:0.45,
              normalizedYtoC_xs:0.55   
            });
            break;
          case 6:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              normalizedXtoC: 0.26458,
              normalizedYtoC: 0.539,
              normalizedXtoC_md:0.35,
              normalizedYtoC_md:0.8,
              normalizedXtoC_xs:0.1,
              normalizedYtoC_xs:0.65   
            });
            break;
          case 7:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({
              scale: 0.8,
              normalizedXtoC: 0.4208,
              normalizedYtoC: 0.6511,
              normalizedXtoC_md:0.2,
              normalizedYtoC_md:0.6,
              normalizedXtoC_xs:0.45,
              normalizedYtoC_xs:0.75  
            });
            break; 
        }

        gsap.to(imageRef, {
          ...animationProps,
          scrollTrigger: {
            trigger: ref.current,
            scroller: scrollAreaRef.current || window,
            start: "center bottom",
            end: window.matchMedia('(max-width: 575.98px)').matches?"+=200":'+=500',
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
      className="row student-gallary-section vw-100"
      style={{
        position: "relative",
        height: '110vh'
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


/* const StudentsGallarySection = forwardRef(({ scrollAreaRef }, ref) => {
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


  const calculateAnimationPropsBasedOnMEdiaQuery = (animationProps)=>{

    if(window.innerWidth > 1200) return {
      scale:animationProps.scale,
      xPercent:animationProps.xPercent,
      yPercent:animationProps.yPercent
    };


    const scaleFactor = (window.innerWidth/1200)*1.3
    const xFactor = (window.innerWidth/1200)


    let scale = animationProps.scale * scaleFactor;
    let yPercent = animationProps.ySmallPercent ?? animationProps.yPercent;

    let xPercent = animationProps.xPercent ;

    if(animationProps.xSmallPercent){
      xPercent = animationProps.xSmallPercent;
    }else if(xPercent > 0){
      xPercent -= (xFactor * 100*4)
    }else{
      xPercent += (xFactor * 100*4)
    }


    return {
      scale,
      xPercent,
      yPercent
    }
  }

  useGSAP(() => {
    let ctx = gsap.context(() => {

      imageRefs.current.forEach((imageRef) => {
        gsap.set(imageRef, {
          scale: 1,
          position: "absolute",
        });
      });

      imageRefs.current.forEach((imageRef, index) => {
        let animationProps = {};

        switch (index) {
          case 0:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({ scale: 0.8, xPercent: -150, yPercent: -100 });
            break;
          case 1:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({ scale: 0.85, xPercent: 50, yPercent: -100 });
            break;
          case 2:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({ scale: 0.8, xPercent: -150, yPercent: 10 });
            break;
          case 3:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({ scale: 0.85, xPercent: 50, yPercent: 10 });
            break;


          case 4:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({ scale: 0.75,xSmallPercent:-30, xPercent: -70,ySmallPercent:-60, yPercent: -100 });
            break;
          case 5:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({ scale: 0.8,xSmallPercent:-65, xPercent: 5,ySmallPercent:-70, yPercent: -50 });
            break;
          case 6:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({ scale: 0.8,xSmallPercent:-62, xPercent: -100,ySmallPercent:-30, yPercent: -15 });
            break;
          case 7:
            animationProps = calculateAnimationPropsBasedOnMEdiaQuery({ scale: 0.8,xSmallPercent:-35, xPercent: -40,ySmallPercent:-20, yPercent: 10 });
            break;
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
      className="row justify-content-center align-content-center vw-100"
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div className="container mt-0 p-0 student-gallary-section">
        <div className="row justify-content-center text-center mt-5 mt-sm-0">
          <div
            className="col-11 col-sm-8 col-md-7 col-lg-5"
            style={{ position: "relative" }}
          >
            {studentsGallary.map((item, index) => {
              return (
                <div
                  key={`student-gallary-img-${index}`}
                  className="student-gallary-img-container"
                  ref={addToRefs}
                >
                  <img src={item.img} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}); */

export default StudentsGallarySection;
