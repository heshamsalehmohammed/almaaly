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

const ThirdSection = () => {
  return (
    <div
    class="row justify-content-center vw-100 vh-100"
    style={{
      position: "absolute",
      top: `${200}vh`,
    }}
  >  <div className="container mt-5 p-0">
      <div
        className="row justify-content-center p-5 text-center"
        style={{ backgroundColor: "#020278" }}
      >
        <div class="col-5">
          <Slide direction="up">
            {" "}
            <h2 className="text-white">Join the Almaaly Community</h2>
            <p className="text-white">
              Become a part of our vibrant school community and explore the
              endless opportunities we offer. Enroll today to start your
              journey.
            </p>{" "}
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
        <div className="col-sm-4 col-10 d-flex">
          <Zoom duration={200}>
            <Fade duration={500}>
             <img
            src={SoFar} // replace with the correct path to the image
            alt="Quote"
            className="img-fluid align-self-center"
          /> 
          </Fade>
          </Zoom>
          
        
        </div>

        <div className="col-sm-4 col-10 d-flex">
          <div className="w-100 d-flex flex-column justify-content-between text-dark ">
            <div>
              <Slide direction="up">
                <p className="fs-5 text-start">
                  Being part of Almaaly has been a transformative journey. The
                  school's commitment to fostering a supportive and dynamic
                  learning environment is unparalleled. The diverse programs and
                  passionate educators have truly enriched my educational
                  experience.
                </p>
              </Slide>
            </div>
            <div className="text-start">
              <Slide direction="up" cascade>
                {" "}
                <h5>Emily Carter</h5>
                <p className="text-muted">Almaaly Alumnus</p>
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  
  );
};

export default ThirdSection;
