import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const ContactUs = ({scrollAreaRef}) => {

const contactUsRef = useRef()



  return (
    <div className=" row w-100 justify-content-center  mt-5 mb-5 " ref={contactUsRef}>
      <div className="col-12">
        <span>Contact</span>
        <h2>Get In Touch!</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-4    ">
          <div className="contact-box">
            <div className="contact-row">
              <i className="fa fa-map-marker"></i> 123 New Street Here,
              Wonderful City 10220
            </div>
            <div className="contact-row">
              <i className="fa fa-phone"></i> 090 080 0210
            </div>
            <div className="contact-row">
              <i className="fa fa-envelope"></i> info@company.co
            </div>
          </div>
        </div>
        <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-4    ">
          <form id="ajax-contact" method="post" action="#">
            <div className="input-field">
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                required
                placeholder="Name"
              />
            </div>
            <div className="input-field">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                required
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <textarea
                className="form-control"
                name="message"
                id="message"
                required
                placeholder="Message"
              ></textarea>
            </div>
            <button className="btn w-100" type="submit">
              Submit
            </button>
          </form>
          <div id="form-messages" className="mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
