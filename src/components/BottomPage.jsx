import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { gsap } from "gsap";

const MainYouTubeEmbedWithAnimation = forwardRef(
  ({ videoId, scrollAreaRef }, ref) => {
    const videoResponsive = useRef();

    useImperativeHandle(ref, () => videoResponsive.current);

    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      if (!videoResponsive.current) return;
      let ctx = gsap.context(() => {
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
              scroller: scrollAreaRef.current,
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
              scroller: scrollAreaRef.current,
              trigger: videoResponsive.current,
              start: "top 40%",
              end: "bottom 10%",
              scrub: true,
              // markers:true
            },
          }
        );
      });

      return () => ctx.revert();
    }, []);

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
  }
);

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

const BottomPage = forwardRef(({ scrollAreaRef, config }, ref) => {
  const { mainTitle, mainText, subtitle, videos, metaDescription } =
    config.school.bottomPage;
  const bottomElementRef = useRef(null); // Reference to the container
  const videoResponsiveRef = useRef(null);
  const mainWorksTitleRef = useRef();
  const mainWorksSubTitleRef = useRef();
  const stickyElementRef = useRef();
  const lastRowRef = useRef();

  const video1Ref = useRef();
  const video2Ref = useRef();
  const video3Ref = useRef();

  const [currentWorksSubTitle, setCurrentWorksSubTitle] = useState(
    subtitle.video1
  );

  useImperativeHandle(ref, () => bottomElementRef.current);

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
        setCurrentWorksSubTitle(subtitle.video1);
      } else if (subtitleRect.bottom <= video2Rect.bottom) {
        setCurrentWorksSubTitle(subtitle.video2);
      } else if (subtitleRect.bottom <= video3Rect.bottom) {
        setCurrentWorksSubTitle(subtitle.video3);
      }
    }
  };

  useEffect(() => {
    scrollAreaRef.current.addEventListener("scroll", handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      scrollAreaRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
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
              scroller: scrollAreaRef.current,
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
            y: 80,
          },
          {
            y: 0,
            ease: "elastic.out(1,1)",
            scrollTrigger: {
              scroller: scrollAreaRef.current,
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
        "--gradient-end": "#39ced6", // Transition to white
        ease: "none",
        scrollTrigger: {
          scroller: scrollAreaRef.current,
          trigger: videoResponsiveRef.current, // Use the video-responsive as the trigger
          start: "bottom 80%", // When the trigger's bottom reaches 50% of the viewport
          end: "bottom top", // When the trigger's top reaches the top of the viewport
          scrub: true, // Links the animation progress to the scrollbar
          // markers: true,       // Uncomment for debugging
        },
      });

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.to(stickyElementRef.current, {
          scrollTrigger: {
            scroller: scrollAreaRef.current,
            trigger: stickyElementRef.current,
            start: "top top",
            endTrigger: lastRowRef.current,
            end: "center center",
            pin: true,
            scrub: 1, // Smooth scrolling on desktop
            markers: false,
            anticipatePin: 1,
          },
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.to(stickyElementRef.current, {
          scrollTrigger: {
            scroller: scrollAreaRef.current,
            trigger: stickyElementRef.current,
            start: "top top",
            endTrigger: lastRowRef.current,
            end: "center center",
            pin: true,
            pinType: "fixed",
            fastScrollEnd: true,
            scrub: 1, // Smooth scrolling on desktop
            markers: false,
            anticipatePin: 1,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
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
    }, bottomElementRef);
    return () => ctx.revert();
  }, [currentWorksSubTitle]);

  return (
    <>
      {/*   <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            name: mainTitle,
            hasCourse: videos.map((video, index) => ({
              "@type": "Course",
              name: video.title,
              video: {
                "@type": "VideoObject",
                name: video.title,
                embedUrl: `https://www.youtube.com/embed/${video.id}`,
              },
            })),
          })}
        </script>
      </Helmet> */}

      <div className="bottom-element" ref={bottomElementRef}>
        <div className="d-flex w-100 flex-column text-white text-start mb-2 p-5">
          {mainText.map((text, index) => (
            <div
              className="bottom-element-text font-poppins-semi-bold-italic"
              key={index}
            >
              <div>
                <h1
                  className={`${
                    index !== 2 ? "pb-4" : ""
                  } display-6 display-md-4 display-xl-3 text-transform-none`}
                >
                  {text}
                </h1>
              </div>
            </div>
          ))}
        </div>

        <div className="row w-100 p-1 mt-1 mb-5 justify-content-center">
          <div className="col-12 col-md-8 col-lg-8 col-xl-7">
            <MainYouTubeEmbedWithAnimation
              videoId={videos[0].id}
              scrollAreaRef={scrollAreaRef}
              ref={videoResponsiveRef}
            />
          </div>
        </div>
        <div
          className="row w-100 min-vh-100 w-100 p-3 mt-6  justify-content-center bottom-page-sticky-element"
          ref={stickyElementRef}
        >
          <div className="col-12 col-sm-10 col-md-9 col-lg-8 d-flex flex-column">
            <div
              className="bottom-element-text mt-5 main-works-title"
              ref={mainWorksTitleRef}
            >
              <div>
                <h1 className="py-5 display-6 display-md-5 display-lg-4  display-xl-3 fw-bold text-dark font-protest-strike">
                  {mainTitle}
                </h1>
              </div>
            </div>
            <div
              className="bottom-element-text mt-auto mb-auto main-works-subtitle"
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
            <div className="col-11 col-md-6 col-lg-6 col-xl-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation
                videoId={videos[1].id}
                ref={video1Ref}
              />
            </div>
          </div>
          <div className="row p-3 mt-5 mb-5  pt-5 pb-5 justify-content-center">
            <div className="col-11 col-md-6 col-lg-6 col-xl-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation
                videoId={videos[2].id}
                ref={video2Ref}
              />
            </div>
          </div>
          <div
            className="row p-3 mt-5 mb-5  pt-5 pb-5 justify-content-center"
            ref={lastRowRef}
          >
            <div className="col-11 col-md-6 col-lg-6 col-xl-5 pt-5 pb-5">
              <NormalYouTubeEmbedWithAnimation
                videoId={videos[3].id}
                ref={video3Ref}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default BottomPage;
