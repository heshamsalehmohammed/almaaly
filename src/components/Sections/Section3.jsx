// src/components/Section3.js

import React, { useEffect, useRef } from "react";
import _ from "lodash"; // Import lodash.debounce

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Section3 = () => {
  const services = [
    {
      icon: "fa-bookmark",
      title: "Bootstrap Themes",
      desc: "Nullam auctor, justo vitae accumsan ultrices, arcu ex molestie massa, eu maximus enim tortor vitae quam.",
    },
    {
      icon: "fa-cloud",
      title: "HTML5 Coding",
      desc: "Nullam auctor, justo vitae accumsan ultrices, arcu ex molestie massa, eu maximus enim tortor vitae quam.",
    },
    {
      icon: "fa-desktop",
      title: "Fully Responsive",
      desc: "Nullam auctor, justo vitae accumsan ultrices, arcu ex molestie massa, eu maximus enim tortor vitae quam.",
    },
    {
      icon: "fa-mobile",
      title: "Mobile Ready",
      desc: "Nullam auctor, justo vitae accumsan ultrices, arcu ex molestie massa, eu maximus enim tortor vitae quam.",
    },
    {
      icon: "fa-comments",
      title: "Fast Support",
      desc: "Nullam auctor, justo vitae accumsan ultrices, arcu ex molestie massa, eu maximus enim tortor vitae quam.",
    },
    {
      icon: "fa-database",
      title: "24-hour Up Time",
      desc: "Nullam auctor, justo vitae accumsan ultrices, arcu ex molestie massa, eu maximus enim tortor vitae quam.",
    },
    {
      icon: "fa-bell",
      title: "Instant Upgrades",
      desc: "Nullam auctor, justo vitae accumsan ultrices, arcu ex molestie massa, eu maximus enim tortor vitae quam.",
    },
    {
      icon: "fa-camera",
      title: "Always Monitoring",
      desc: "Nullam auctor, justo vitae accumsan ultrices, arcu ex molestie massa, eu maximus enim tortor vitae quam.",
    },
  ];

  return (
    <div className="row justify-content-center animated-row">
      <div className="col-md-8 col-10">
        <div className="title-block animate__animated animate__fadeInUp">
          <span>Services</span>
          <h2>What I Do?</h2>
        </div>
      </div>
      <div className="col-md-8 col-10 m-2">
        <div className="services-section">
          <Swiper effect={"coverflow"} grabCursor={true} centeredSlides={true} slidesPerView={"auto"} coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }} pagination={{
              clickable: true,
              el: '.custom-pagination-services'
            }} modules={[Autoplay, EffectCoverflow, Pagination]} className="services-list" autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }} initialSlide={Math.ceil(services.length/2)}>
            {services.map((service, index) => (
            <SwiperSlide key={index} className="item ms-2 me-2">
              <div className="service-box">
                <span className="service-icon">
                  <i className={`fa ${service.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination custom-pagination-services"></div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
