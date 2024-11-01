// src/components/Section2.js

import { forwardRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import { Helmet } from "react-helmet";
import { Slide } from "react-awesome-reveal";


const SecondSection = forwardRef(({config}, ref) => {
  const { facts, aboutUs, galleryImages } = config.school;

  return (
    <>
     {/*  <Helmet>
     
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: config.school.name,
            description: aboutUs.description,
            department: aboutUs.sections.map((section) => ({
              "@type": "EducationalOccupationalProgram",
              name: section.title,
            })),
            hasPart: facts.map((fact) => ({
              "@type": "Achievement",
              name: fact.title,
              numberOfItems: fact.count,
            })),
          })}
        </script>
      </Helmet> */}

      <div
        ref={ref}
        className="row justify-content-center align-content-center vw-100"
        style={{
          position: "relative",
          minHeight: "100vh",
          marginTop: "100vh",
        }}
      >
        <div className="row w-100 justify-content-center pt-3 pt-md-0 section2">
          <div className="col-md-4 mb-3 mb-md-0 pt-3 pt-md-0 col-120">
            <div className="about-contentbox">
              <div className="text-shadow-1">
                <div className="row mt-4 mb-4">
                  {aboutUs.sections.map((section, index) => (
                    <div className="col-md-4 mb-4 mb-sm-0" key={index}>
                      <Slide direction="up">
                        <i className={`fas ${section.icon}`}></i>
                        <h6>{section.title}</h6>
                      </Slide>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <Slide direction="up">
                    <p className="fw-bold">{aboutUs.description}</p>
                  </Slide>
                </div>
              </div>

              <div className="facts-list mt-4 w-5 overflow-x-hidden">
                <Swiper
                  grabCursor={true}
                  loop={true}
                  slidesPerView={"auto"}
                  centeredSlides={true}
                  pagination={{
                    clickable: true,
                    el: ".custom-pagination-facts",
                  }}
                  modules={[Autoplay, Pagination]}
                  initialSlide={Math.ceil(facts.length / 2)}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                >
                  {facts.map((fact, index) => (
                    <SwiperSlide
                      className="item text-center ms-2 me-2 p-3"
                      key={index}
                    >
                      <div className="counter-box">
                        <i
                          className={`fa ${fact.icon} counter-icon fa-2x mb-2`}
                          aria-hidden="true"
                        ></i>
                        <h4 className="count-number">{fact.count}</h4>
                        <p>{fact.title}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="custom-pagination custom-pagination-facts"></div>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-12 position-relative p-0 p-sm-1">
            <div className="section2-slider-container">
              <Swiper
                slidesPerView={"auto"}
                centeredSlides={true}
                className="gallery-swiper"
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                initialSlide={Math.floor(galleryImages.length / 2)}
              >
                {galleryImages.map((img, index) => (
                  <SwiperSlide
                    className="gallery-slide-item text-center active"
                    key={index}
                  >
                    <img src={img} alt={`Slide ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});


export default SecondSection;
