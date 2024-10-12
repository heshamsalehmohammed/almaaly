// src/components/Section6.js

import React, { useEffect, useRef } from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel"; // Import Owl Carousel JS

// Import your gallery images
import item1 from "../../assets/images/item-1.jpg";
import item2 from "../../assets/images/item-2.jpg";
import item3 from "../../assets/images/item-3.jpg";

const Section6 = () => {
  const galleryListRef = useRef(null); // Reference to the .gallery-list element

  useEffect(() => {
    // Initialize Owl Carousel
    $(galleryListRef.current).owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        items: 3,
        autoplay: true,
        smartSpeed: 700,
        autoplayTimeout: 4000,
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            576: {
                items: 2,
                margin: 20
            },
            992: {
                items: 3,
                margin: 30
            }
        }
    });

    // Cleanup function to destroy carousel on component unmount
    return () => {
      $(galleryListRef.current).owlCarousel("destroy");
    };
  }, []);

  // Array of gallery items
  const galleryItems = [
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
              {/* Apply Owl Carousel to gallery-list */}
              <div className="gallery-list owl-carousel" ref={galleryListRef}>
                {galleryItems.map((item, index) => (
                  <div
                    className="item animate"
                    data-animate="fadeInUp"
                    key={index}
                  >
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  );
};

export default Section6;
