// src/components/Section2.js

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import profileGirl from "../../assets/images/profile-girl.jpg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import galary1 from "../../assets/images/galary-1.jpeg";
import galary2 from "../../assets/images/galary-2.jpeg";
import galary3 from "../../assets/images/galary-3.jpeg";
import galary4 from "../../assets/images/galary-4.jpeg";
import {
  Slide,
  Fade,
  JackInTheBox,
  Roll,
  Zoom,
  Bounce,
} from "react-awesome-reveal";

const SecondSection = () => {
  const facts = [
    { icon: "fa-trophy mb-3", title: "Awards Won", count: 32 },
    { icon: "fa-graduation-cap  mb-3", title: "Degrees", count: 4 },
    { icon: "fa-desktop  mb-3", title: "Working Years", count: 12 },
    { icon: "fa-solid fa-life-ring  mb-3", title: "Team Members", count: 6 },
    { icon: "fa-certificate  mb-3", title: "Certificates", count: 10 },
  ];

  const gallery = [
    {
      img: galary1,
    },
    {
      img: galary2,
    },
    {
      img: galary3,
    },
    {
      img: galary4,
    },
  ];

  return (
    <div
    className="row justify-content-center align-content-center vw-100 vh-100"
    style={{
      position: "relative",
      marginTop:'100vh'
    }}
  >    <div className="row w-100 justify-content-center pt-3 pt-md-0 section2">
      <div className="col-md-4 mb-3 mb-md-0 pt-3 pt-md-0  col-10">
        <div className="about-contentbox">
          <div className=" text-shadow-1  ">
            <div className="row mt-4 mb-4">
              <div className="col-md-4">
                <Slide direction="up">
                  <i className="fas fa-graduation-cap fa-2x mb-2"></i>
                  <h6>HOLISTIC EDUCATION</h6>{" "}
                </Slide>
              </div>
              <div className="col-md-4">
                <Slide direction="up">  <i className="fas fa-heart fa-2x mb-2"></i>
                <h6>CARING ENVIRONMENT</h6></Slide>
              
              </div>
              <div className="col-md-4">
              <Slide direction="up">  <i className="fas fa-globe fa-2x mb-2"></i>
                <h6>GLOBAL PERSPECTIVE</h6></Slide>

              
              </div>
            </div>
            <div className="row">
              <Slide direction="up">
              
                <p className="fw-bold">
                  Credits go to <strong>Unsplash</strong> and{" "}
                  <strong>Pexels</strong> for photos and video used in this
                  template. Vivamus tincidunt, augue rutrum convallis volutpat,
                  massa lacus tempus leo.
                </p>
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
              className=""
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
            <div className=" custom-pagination custom-pagination-facts"></div>
          </div>
        </div>
      </div>

      <div className="col-md-5 col-10 position-relative">
        <div className="section2-slider-container">
          <Swiper
            loop={true}
            slidesPerView={"auto"}
            centeredSlides={true}
            className="gallery-swiper"
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            initialSlide={Math.floor(gallery.length / 2)}
          >
            {gallery.map((item, index) => (
              <SwiperSlide
                className="gallery-slide-item text-center" // Removed ms-2 me-2
                key={index}
              >
                <img src={item.img} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div></div>

  );
};

export default SecondSection;
