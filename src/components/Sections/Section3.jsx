
const Section3 = () => (
    <div className="section">
      <div className="section-inner">
        <div className="row justify-content-center">
          <div className="col-md-8 wide-col-laptop">
            <div className="title-block animate__animated animate__fadeInUp">
              <span>Services</span>
              <h2>What I Do?</h2>
            </div>
            <div className="services-section">
              <div className="services-list">
                {[
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
                ].map((service, index) => (
                  <div
                    className="service-item animate__animated animate__fadeInUp"
                    key={index}
                  >
                    <div className="service-box">
                      <span className="service-icon">
                        <i
                          className={`fa ${service.icon}`}
                          aria-hidden="true"
                        ></i>
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
      </div>
    </div>
  );




  export default Section3;