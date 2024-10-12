// src/components/Section5.js

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import profile01 from "../../assets/images/profile-01.jpg";

const Section5 = () => {
  const testimonials = [
    {
      name: "Sandar",
      role: "Managing Director",
      img: profile01,
      text: "Ut varius leo eu mauris lacinia, eleifend posuere urna gravida. Aenean a mattis lacus.",
    },
    {
      name: "Shinn",
      role: "CEO and Founder",
      img: profile01,
      text: "Nam iaculis, leo nec facilisis sollicitudin, dui massa tempus odio, vitae malesuada ante elit vitae eros.",
    },
    {
      name: "Marlar",
      role: "Chief Marketing Officer",
      img: profile01,
      text: "Etiam efficitur, tortor facilisis finibus semper, diam magna fringilla lectus, et fringilla felis urna posuere tortor.",
    },
  ];

  return (
    <div className="row w-100 justify-content-center  ">
      <div className="col-md-7 col-10 wide-col-laptop">
        <div className="title-block animate" data-animate="fadeInUp">
          <span>TESTIMONIALS</span>
          <h2>What THEY SAY?</h2>
        </div>
        <div className="col-md-8 offset-md-2">
          <div className="testimonials-section">
            <div className="testimonials-slider">
              <Swiper
                slidesPerView={1}
                grabCursor={true}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                  el: ".custom-pagination-testimonials",
                }}
                modules={[Autoplay, Pagination]}
                className=""
                initialSlide={Math.ceil(testimonials.length / 2)}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide className="item text-center" key={index}>
                    <div className="testimonial-item">
                      <div className="client-row">
                        <img
                          src={item.img}
                          className="rounded-circle"
                          alt={`profile ${index + 1}`}
                        />
                      </div>
                      <div className="testimonial-content">
                        <h4>{item.name}</h4>
                        <p>"{item.text}"</p>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className=" custom-pagination custom-pagination-testimonials"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
