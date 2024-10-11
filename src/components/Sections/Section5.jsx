import profile01 from "../../assets/images/profile-01.jpg";



const Section5 = () => (
    <div className="section">
      <div className="section-inner">
        <div className="row justify-content-center">
          <div className="col-md-8 wide-col-laptop">
            <div className="title-block animate__animated animate__fadeInUp">
              <span>TESTIMONIALS</span>
              <h2>What THEY SAY?</h2>
            </div>
            <div className="testimonials-section">
              <div className="testimonials-slider">
                {[
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
                ].map((testimonial, index) => (
                  <div
                    className="testimonial-item animate__animated animate__fadeInUp"
                    key={index}
                  >
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  



  export default Section5;