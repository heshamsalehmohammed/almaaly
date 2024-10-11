// src/components/Section2.js

import React, { useEffect, useRef } from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel"; // Import Owl Carousel JS
import profileGirl from "../../assets/images/profile-girl.jpg";

const Section2 = () => {
  const factsListRef = useRef(null); // Reference to the .facts-list element

  useEffect(() => {
    // Initialize Owl Carousel
    $(factsListRef.current).owlCarousel({
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
      $(factsListRef.current).owlCarousel("destroy");
    };
  }, []);

  const facts = [
    { icon: "fa-trophy", title: "Awards Won", count: 32 },
    { icon: "fa-graduation-cap", title: "Degrees", count: 4 },
    { icon: "fa-desktop", title: "Working Years", count: 12 },
    { icon: "fa-support", title: "Team Members", count: 6 },
    { icon: "fa-certificate", title: "Certificates", count: 10 },
  ];

  return (
        <div className="about-section">
          <div className="row w-100 justify-content-center animated-row">
            <div className="col-lg-8 wide-col-laptop">
              <div className="row">
                {/* About Content */}
                <div className="col-md-6">
                  <div className="about-contentbox">
                    <div className="animate__animated animate__fadeInUp">
                      <span>About Me</span>
                      <h2>Who am I?</h2>
                      <p>
                        Credits go to <strong>Unsplash</strong> and{" "}
                        <strong>Pexels</strong> for photos and video used in this
                        template. Vivamus tincidunt, augue rutrum convallis
                        volutpat, massa lacus tempus leo.
                      </p>
                    </div>
                    {/* Facts Carousel */}
                    <div className="facts-list owl-carousel mt-4" ref={factsListRef}>
                      {facts.map((fact, index) => (
                        <div
                          className="item animate__animated animate__fadeInUp text-center p-3"
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* About Image */}
                <div className="col-md-6">
                  <figure className="about-img animate__animated animate__fadeInUp">
                    <img src={profileGirl} className="rounded img-fluid" alt="About Me" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Section2;
