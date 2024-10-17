// src/components/Section2.js

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import profileGirl from "../../assets/images/profile-girl.jpg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Section2 = () => {
  const facts = [
    { icon: "fa-trophy mb-3", title: "Awards Won", count: 32 },
    { icon: "fa-graduation-cap  mb-3", title: "Degrees", count: 4 },
    { icon: "fa-desktop  mb-3", title: "Working Years", count: 12 },
    { icon: "fa-solid fa-life-ring  mb-3", title: "Team Members", count: 6 },
    { icon: "fa-certificate  mb-3", title: "Certificates", count: 10 },
  ];

  const scale = (a, b, c, d, e) => {
    return ((a - b) * (e - d)) / (c - b) + d;
  };

  const text1 = useRef();
  const text2 = useRef();
  const imageRef = useRef()

  useGSAP(() => {


    const crazy = (e) => {
      const x = (e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX)) ;
      gsap.to(text1.current, {
        duration: 0.6,
        attr: { startOffset: `${scale(x, 0, window.innerWidth, 0, 75)}%` },
        ease: "Power3.easeOut",
      });
      gsap.to(text2.current, {
        duration: 0.8,
        attr: { startOffset: `${scale(x, 0, window.innerWidth, 75, 0)}%` },
        ease: "Power3.easeOut",
      });
    };

    // Add event listeners for the crazy effect
    const events = ["mousemove", "touchstart", "touchmove"];
    events.forEach((event) => window.addEventListener(event, crazy));

    // Clean up event listeners on component unmount
    return () => {
      events.forEach((event) => window.removeEventListener(event, crazy));
    };
  });

  return (
    <div className="row w-100 justify-content-center   overflow-y-scroll overflow-y-md-hidden pt-3 pt-md-0 section2">
      {/* About Content */}
      <div className="col-md-4 mb-3 mb-md-0 pt-3 pt-md-0  col-10">
        <div className="about-contentbox">
          <div className="   ">
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
      <div className="col-md-5 col-10 position-relative">
        <figure className="about-img" >
          <img src={profileGirl} className="rounded img-fluid" alt="About Me" ref={imageRef}/>
        </figure>
        <svg viewBox="0 0 211.9 104.6" style={{ width: '100%', height: '100%' }} >
          <path
            id="curve-1"
            d="M41.3,71.4V30.9c0-7.4,6-13.5,13.5-13.5h101.7c7.4,0,13.5,6,13.5,13.5v43c0,7.4-6,13.5-13.5,13.5H54.8
    c-7.4,0-13.5-6-13.5-13.5"

          />
          <path
            id="curve-2"
            d="M176.6,33.8v42c0,9.5-7.7,17.2-17.2,17.2H51.8c-9.5,0-17.2-7.7-17.2-17.2V29c0-9.5,7.7-17.2,16.2-17.2h107.6
    c10.5,0,18.2,7.7,18.2,17.2v3.5"

          />
          <text>
            <textPath ref={text1} xlinkHref="#curve-1" startOffset="0%" className="styled-path">
              Here's to the crazy ones
            </textPath>
            <textPath ref={text2} xlinkHref="#curve-2" startOffset="75%" className="styled-path">
              Here's to the crazy ones
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Section2;
