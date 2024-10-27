import React, { forwardRef } from "react";
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

const ThirdSection = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="row justify-content-center vw-100"
      style={{
        position: "relative",
        minHeight: `${100}vh`,
      }}
    >
      <div className="container mt-5 p-0">
        <div
          className="row justify-content-center p-1 p-sm-5 pt-5 pb-5 text-center"
          style={{ backgroundColor: "#020278" }}
        >
          <div className="col-sm-5 col-10">
            <Slide direction="up">
              <h2 className="text-white">Join the Almaaly Community</h2>
              <p className="text-white">
                Become a part of our vibrant school community and explore the
                endless opportunities we offer. Enroll today to start your
                journey.
              </p>
            </Slide>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Button
              className="pe-4 m-2"
              iconPos="right"
              style={{
                width: "180px",
                borderRadius: "15px",
                background: "#fff",
                borderColor: "#fff",
                boxShadow: "none",
                color: "rgb(15 23 42 / 1)",
              }}
              label="Get Started"
              icon="fa-solid fa-arrow-right-long ms-0"
            />
          </div>
        </div>

        <div
          className="row justify-content-center align-items-stretch p-5"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 d-flex">
            <Zoom duration={200}>
              <Fade duration={500}>
                <img
                  src={SoFar} // replace with the correct path to the image
                  alt="Quote"
                  className="img-fluid align-self-center"
                  style={{minHeight:'400px',borderRadius:'15px'}}
                />
              </Fade>
            </Zoom>
          </div>

          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 d-flex">
            <div className="w-100 d-flex flex-column justify-content-between text-dark text-sm-start text-center">
              <div>
                <Slide direction="up">
                  <p className="fs-5 mt-4 mt-md-0">
                    Being part of Almaaly has been a transformative journey. The
                    school's commitment to fostering a supportive and dynamic
                    learning environment is unparalleled. The diverse programs
                    and passionate educators have truly enriched my educational
                    experience.
                  </p>
                </Slide>
              </div>
              <div className="">
                <Slide direction="up" cascade>
                  <h5 className="mb-0">Emily Carter</h5>
                  <p className="text-muted mt-0">Almaaly Alumnus</p>
                </Slide>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ThirdSection;
