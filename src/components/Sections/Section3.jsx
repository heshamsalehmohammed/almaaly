// src/components/Section3.js

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import item1 from "../../assets/images/item-1.jpg";
import item2 from "../../assets/images/item-2.jpg";
import item3 from "../../assets/images/item-3.jpg";

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

  const works = [
    {
      img: item1,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap CSS templates.",
    },
    {
      img: item2,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap themes.",
    },
    {
      img: item3,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap layouts.",
    },
    {
      img: item1,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap templates.",
    },
    {
      img: item2,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap CSS templates.",
    },
    {
      img: item3,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap templates.",
    },
    {
      img: item1,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap templates.",
    },
    {
      img: item2,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap templates.",
    },
    {
      img: item3,
      title: "templatemo is the best",
      desc: "Please tell your friends about it. Templatemo is the best website to download free Bootstrap templates.",
    },
  ];

  return (
    <div className="row w-100 justify-content-center  ">
      <div className="col-md-7 col-10">
      <div className="gallery-section">
          <div className="gallery-list">
            <Swiper
              slidesPerView={3}
              grabCursor={true}
              centeredSlides={true}
              pagination={{
                clickable: true,
                el: ".custom-pagination-works",
              }}
              modules={[Autoplay, Pagination]}
              className=""
              initialSlide={Math.ceil(works.length / 2)}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  width: 0,
                },
                760: {
                  slidesPerView: 2,
                  width: 760,
                },
                1200: {
                  slidesPerView: 3,
                  width: 1200,
                },
              }}
            >
              {works.map((item, index) => (
                <SwiperSlide className="item text-center" key={index}>
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={item.img} alt={`Portfolio ${index + 1}`} />
                    </div>
                    <div
                      className="thumb-inner animate"
                      data-animate="fadeInUp"
                    >
                      <h4>{item.title}</h4>
                      <p>"{item.desc}"</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className=" custom-pagination custom-pagination-works"></div>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-12 m-2">
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
