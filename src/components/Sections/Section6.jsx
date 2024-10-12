// src/components/Section6.js

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

// Import your gallery images
import item1 from "../../assets/images/item-1.jpg";
import item2 from "../../assets/images/item-2.jpg";
import item3 from "../../assets/images/item-3.jpg";

const Section6 = () => {
  // Array of gallery items
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
      <div className="col-md-8 col-12 wide-col-laptop">
        <div className="title-block animate" data-animate="fadeInUp">
          <span>My Work</span>
          <h2>what i’ve done?</h2>
        </div>
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
    </div>
  );
};

export default Section6;
