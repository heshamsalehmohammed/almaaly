import React from "react";
import { Button } from "primereact/button";
import SoFar from "../../assets/images/so-far.jpeg";

import {
  Slide,
  Fade,
  JackInTheBox,
  Roll,
  Zoom,
  Bounce,
} from "react-awesome-reveal";

const FourthSection = () => {
  return (
    <div
      className="row justify-content-center align-content-center vw-100 vh-100"
      style={{
        position: "absolute",
        top: `${300}vh`,
      }}
    >
      {" "}
      <div className="container mt-0 p-0">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-sm-8 col-md-7 col-lg-5">
            <Slide direction="up">
              <h3 style={{ color: "rgb(2, 2, 120)" }} className="text-shadow-1">
                Diverse and Comprehensive
              </h3>
              <h2 className="mb-4 text-shadow-1" style={{ fontWeight: "bold" }}>
                Explore Our Programs
              </h2>
              <p className="mb-5 text-shadow-1 fw-bold">
                Almaaly offers a wide range of programs designed to cater to the
                unique interests and strengths of each student.
              </p>
            </Slide>
          </div>
        </div>

        <div className="row justify-content-center text-center text-shadow-1">
          <div className="col-md-4 mb-4">
            <Zoom duration={200}>
              <Fade duration={500}>
                <div
                  className="icon-box  text-white d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "rgb(2, 2, 120)",
                    borderRadius: "10px",
                  }}
                >
                  <i className="fas fa-school fa-2x"></i>
                </div>
              </Fade>
            </Zoom>

            <Slide direction="up">
              <h5>STEM Education</h5>
              <p>
                Innovative curriculum fostering critical thinking and
                problem-solving skills.
              </p>
            </Slide>
          </div>

          <div className="col-md-4 mb-4">
            <Zoom duration={200}>
              <Fade duration={500}>
                <div
                  className="icon-box  text-white d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "rgb(2, 2, 120)",
                    borderRadius: "10px",
                  }}
                >
                  <i className="fas fa-theater-masks fa-2x"></i>
                </div>
              </Fade>
            </Zoom>

            <Slide direction="up">
              <h5>Arts & Humanities</h5>
              <p>Encouraging creative expression and cultural awareness.</p>
            </Slide>
          </div>
        </div>
        <div className="row justify-content-center text-center text-shadow-1">
          <div className="col-md-4 mb-4">
            <Zoom duration={200}>
              <Fade duration={500}>
                <div
                  className="icon-box  text-white d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "rgb(2, 2, 120)",
                    borderRadius: "10px",
                  }}
                >
                  <i className="fas fa-dumbbell fa-2x"></i>
                </div>
              </Fade>
            </Zoom>

            <Slide direction="up">
              <h5>Sports & Wellness</h5>
              <p>Promoting physical health and teamwork.</p>
            </Slide>
          </div>

          <div className="col-md-4 mb-4">
            <Zoom duration={200}>
              <Fade duration={500}>
                <div
                  className="icon-box  text-white d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "rgb(2, 2, 120)",
                    borderRadius: "10px",
                  }}
                >
                  <i className="fas fa-book fa-2x"></i>
                </div>
              </Fade>
            </Zoom>

            <Slide direction="up">
              <h5>Languages & Literature</h5>
              <p>Building communication skills and literary appreciation.</p>
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthSection;
