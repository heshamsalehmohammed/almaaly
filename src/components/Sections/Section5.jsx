// src/components/Section5.js

import React, { useEffect, useRef } from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel"; // Import Owl Carousel JS
import profile01 from "../../assets/images/profile-01.jpg";

const Section5 = () => {
  const testimonialsListRef = useRef(null); // Reference to the .testimonials-slider element

  useEffect(() => {
    // Initialize Owl Carousel
    $(testimonialsListRef.current).owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      items: 1,
      margin: 30,
      autoplay: true,
      smartSpeed: 700,
      autoplayTimeout: 6000,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },
        768: {
          items: 1,
        },
      },
    });

    // Cleanup function to destroy carousel on component unmount
    return () => {
      $(testimonialsListRef.current).owlCarousel("destroy");
    };
  }, []);

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
            <div
              className="title-block animate"
              data-animate="fadeInUp"
            >
              <span>TESTIMONIALS</span>
              <h2>What THEY SAY?</h2>
            </div>
            <div className="col-md-8 offset-md-2">
              <div className="testimonials-section">
                {/* Apply Owl Carousel to testimonials-slider */}
                <div
                  className="testimonials-slider owl-carousel"
                  ref={testimonialsListRef}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      className="item animate"
                      data-animate="fadeInUp"
                      key={index}
                    >
                      <div className="testimonial-item">
                        <div className="client-row">
                          <img
                            src={testimonial.img}
                            className="rounded-circle"
                            alt={`profile ${index + 1}`}
                          />
                        </div>
                        <div className="testimonial-content">
                          <h4>{testimonial.name}</h4>
                          <p>"{testimonial.text}"</p>
                          <span>{testimonial.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Section5;
