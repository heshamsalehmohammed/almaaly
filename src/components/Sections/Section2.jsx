// src/components/Section2.js

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import profileGirl from "../../assets/images/profile-girl.jpg";

const Section2 = () => {
  const facts = [
    { icon: "fa-trophy mb-3", title: "Awards Won", count: 32 },
    { icon: "fa-graduation-cap  mb-3", title: "Degrees", count: 4 },
    { icon: "fa-desktop  mb-3", title: "Working Years", count: 12 },
    { icon: "fa-solid fa-life-ring  mb-3", title: "Team Members", count: 6 },
    { icon: "fa-certificate  mb-3", title: "Certificates", count: 10 },
  ];

  return (
    <div className="row w-100 justify-content-center animated-row overflow-y-scroll overflow-y-md-hidden pt-3 pt-md-0">

          {/* About Content */}
          <div className="col-md-4 mb-3 mb-md-0 pt-3 pt-md-0  col-10">
            <div className="about-contentbox">
              <div className="animate__animated animate__fadeInUp">
                <span>About Us</span>
                <h2>Who are We?</h2>
                <p>
                  Credits go to <strong>Unsplash</strong> and{" "}
                  <strong>Pexels</strong> for photos and video used in this
                  template. Vivamus tincidunt, augue rutrum convallis volutpat,
                  massa lacus tempus leo.
                </p>
              </div>
              {/* Facts Carousel */}
              <div className="facts-list mt-4 w-5 overflow-x-hidden">
                <Swiper
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={3}
                  pagination={{
                    clickable: true,
                    el: ".custom-pagination-facts",
                  }}
                  modules={[Autoplay, Pagination]}
                  className=""
                  initialSlide={Math.ceil(facts.length / 2)}
                  autoplay={{
                    delay: 3000,
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
                <div className=" custom-pagination custom-pagination-facts"></div>
              </div>
            </div>
          </div>
          {/* About Image */}
          <div className="col-md-5 col-10">
            <figure className="about-img animate__animated animate__fadeInUp">
              <img
                src={profileGirl}
                className="rounded img-fluid"
                alt="About Me"
              />
            </figure>
          </div>
        </div>
    
  );
};

export default Section2;
