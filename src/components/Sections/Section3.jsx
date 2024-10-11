// src/components/Section3.js

import React, { useEffect, useRef } from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel"; // Import Owl Carousel JS

const Section3 = () => {
  const servicesListRef = useRef(null); // Reference to the .services-list element

  useEffect(() => {
    // Initialize Owl Carousel
    $(servicesListRef.current).owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      items: 3,
      margin: 30,
      autoplay: false,
      smartSpeed: 700,
      autoplayTimeout: 6000,
      responsive: {
          0: {
              items: 1,
              margin: 0
          },
          460: {
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
      $(servicesListRef.current).owlCarousel("destroy");
    };
  }, []);

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
            <div className="services-section">
              {/* Apply Owl Carousel to services-list */}
              <div className="services-list owl-carousel" ref={servicesListRef}>
                {services.map((service, index) => (
                  <div
                    className="item animate__animated animate__fadeInUp"
                    key={index}
                  >
                    <div className="service-box">
                      <span className="service-icon">
                        <i className={`fa ${service.icon}`} aria-hidden="true"></i>
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
 
  );
};

export default Section3;
