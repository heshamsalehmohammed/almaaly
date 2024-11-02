import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { Helmet } from "react-helmet";
import "./QuotesSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const Quote = forwardRef(({ img, top, text, author, title }, ref) => {
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

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
      gsap.set(quote1Ref.current, {
        position: "absolute",
        top: "0",
      });
      if (window.matchMedia("(max-width: 575.98px)").matches) {
        gsap.set(quote2Ref.current, {
          position: "absolute",
          top: `100vh`,
        });

        gsap.set(quote3Ref.current, {
          position: "absolute",
          top: `200vh`,
        });

        gsap.set(quote4Ref.current, {
          position: "absolute",
          top: `300vh`,
        });

        gsap.set(quotesSectionRef.current, {
          height: `400vh`,
        });
      } else if (
        window.matchMedia("(min-width: 576px) and (max-width: 767.98px)")
          .matches
      ) {
        // Small devices (sm)

        gsap.set(quote2Ref.current, {
          position: "absolute",
          top: `100vh`,
        });

        gsap.set(quote3Ref.current, {
          position: "absolute",
          top: `200vh`,
        });

        gsap.set(quote4Ref.current, {
          position: "absolute",
          top: `300vh`,
        });

        gsap.set(quotesSectionRef.current, {
          height: `400vh`,
        });
      } else if (
        window.matchMedia("(min-width: 768px) and (max-width: 991.98px)")
          .matches
      ) {
        // Medium devices (md)
        gsap.set(quote2Ref.current, {
          position: "absolute",
          top: `90vh`,
        });

        gsap.set(quote3Ref.current, {
          position: "absolute",
          top: `180vh`,
        });

        gsap.set(quote4Ref.current, {
          position: "absolute",
          top: `270vh`,
        });

        gsap.set(quotesSectionRef.current, {
          height: `360vh`,
        });
      } else if (window.matchMedia("(min-width: 992px)").matches) {
        // Large devices and above (lg, xl)
        gsap.set(quote2Ref.current, {
          position: "absolute",
          top: `80vh`,
        });

        gsap.set(quote3Ref.current, {
          position: "absolute",
          top: `160vh`,
        });

        gsap.set(quote4Ref.current, {
          position: "absolute",
          top: `240vh`,
        });

        gsap.set(quotesSectionRef.current, {
          height: `320vh`,
        });
      }

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
          pinType: window.matchMedia("(max-width: 767px)").matches
            ? "fixed"
            : undefined,
          fastScrollEnd: window.matchMedia("(max-width: 767px)").matches
            ? true
            : undefined,
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
          pinType: window.matchMedia("(max-width: 767px)").matches
            ? "fixed"
            : undefined,
          fastScrollEnd: window.matchMedia("(max-width: 767px)").matches
            ? true
            : undefined,
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
          pinType: window.matchMedia("(max-width: 767px)").matches
            ? "fixed"
            : undefined,
          fastScrollEnd: window.matchMedia("(max-width: 767px)").matches
            ? true
            : undefined,
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/*       <Helmet>
      
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWorkSeries",
            name: "Testimonials",
            about: config.school.name,
            mainEntity: quotes.map((quote) => ({
              "@type": "Review",
              reviewBody: quote.text,
              author: {
                "@type": "Person",
                name: quote.author,
                jobTitle: quote.title,
              },
              associatedMedia: {
                "@type": "ImageObject",
                contentUrl: quote.img,
                description: `${quote.author} - ${quote.title}`
              },
            })),
          })}
        </script>
      </Helmet> */}

      <div
        ref={quotesSectionRef}
        className="row justify-content-center vw-100"
        style={{
          position: "relative",
        }}
      >
        <div className="container mt-0 p-0 quotes-section">
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
              />
              <Quote
                ref={quote2Ref}
                img={quotes[1].img}
                text={quotes[1].text}
                author={quotes[1].author}
                title={quotes[1].title}
              />
              <Quote
                ref={quote3Ref}
                img={quotes[2].img}
                text={quotes[2].text}
                author={quotes[2].author}
                title={quotes[2].title}
              />
              <Quote
                ref={quote4Ref}
                img={quotes[3].img}
                text={quotes[3].text}
                author={quotes[3].author}
                title={quotes[3].title}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default QuotesSection;
