import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import emailjs from 'emailjs-com';
import { Button } from "primereact/button";
import config from "../../config";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ContactUs = ({ scrollAreaRef }) => {
  const contactUsRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { address, telephone, email } = config.school;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    emailjs
      .send("service_hsp6net", "template_4vl8zl7", formData, "omTOhWjbjSbjozZkp")
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to send email. Please try again later.");
      });
  };

  return (
    <>
      <Helmet>
        {/* JSON-LD structured data for contact information */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "telephone": telephone,
            "email": email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": address.streetAddress,
              "addressLocality": address.addressLocality,
              "postalCode": address.postalCode,
              "addressCountry": address.addressCountry,
            },
          })}
        </script>
      </Helmet>

      <div className="row w-100 justify-content-center mt-5 mb-5" ref={contactUsRef}>
        <div className="col-12 mb-3">
          <h1>Get In Touch!</h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-4">
            <div className="contact-box">
              <div className="contact-row">
                <i className="fa fa-map-marker"></i> {address.streetAddress}, {address.addressLocality} {address.postalCode}
              </div>
              <div className="contact-row">
                <i className="fa fa-phone"></i> {telephone}
              </div>
              <div className="contact-row">
                <i className="fa fa-envelope"></i> {email}
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-4">
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <textarea
                  className="form-control"
                  name="message"
                  id="message"
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className=""
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  background: "#fff",
                  borderColor: "#fff",
                  boxShadow: "none",
                  color: "rgb(15 23 42 / 1)",
                }}
                label={loading ? "... Submitting" : "Submit"}
              />
            </form>
            <div id="form-messages" className="mt-3">
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && (
                <p style={{ color: "green" }}>Email sent successfully!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
