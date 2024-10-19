import React from "react";
import { Button } from "primereact/button";
import SoFar from "../../assets/images/so-far.jpeg";

const SecondSection = () => {
  return (
    <div className="container mt-5 p-0">
      <div
        className="row justify-content-center p-5 text-center"
        style={{ backgroundColor: "#020278" }}
      >
        <div class="col-5">
          <h2 className="text-white">Join the Almaaly Community</h2>
          <p className="text-white">
            Become a part of our vibrant school community and explore the
            endless opportunities we offer. Enroll today to start your journey.
          </p>
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

      <div className="row justify-content-center align-items-stretch mt-5 p-5">
  {/* Column with Image */}
  <div className="col-sm-4 col-10 d-flex">
    <img
      src={SoFar} // replace with the correct path to the image
      alt="Quote"
      className="img-fluid align-self-center"
    />
  </div>

  {/* Column with Text */}
  <div className="col-sm-4 col-10 d-flex">
    <div className="w-100 d-flex flex-column justify-content-between">
      <div>
        <p className="fs-5 text-start">
          Being part of Almaaly has been a transformative journey. The
          school's commitment to fostering a supportive and dynamic
          learning environment is unparalleled. The diverse programs and
          passionate educators have truly enriched my educational
          experience.
        </p>
      </div>
      <div className="text-start">
        <h5>Emily Carter</h5>
        <p className="text-muted">Almaaly Alumnus</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default SecondSection;
