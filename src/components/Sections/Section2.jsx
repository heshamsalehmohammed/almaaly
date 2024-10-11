import profileGirl from "../../assets/images/profile-girl.jpg";

const Section2 = () => (
    <div className="section">
      <div className="section-inner">
        <div className="about-section">
          <div className="row justify-content-center">
            <div className="col-lg-8 wide-col-laptop">
              <div className="row">
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
                    <div className="facts-list">
                      {[
                        { icon: "fa-trophy", title: "Awards Won", count: 32 },
                        { icon: "fa-graduation-cap", title: "Degrees", count: 4 },
                        { icon: "fa-desktop", title: "Working Years", count: 12 },
                        { icon: "fa-support", title: "Team Members", count: 6 },
                        {
                          icon: "fa-certificate",
                          title: "Certificates",
                          count: 10,
                        },
                      ].map((fact, index) => (
                        <div
                          className="fact-item animate__animated animate__fadeInUp"
                          key={index}
                        >
                          <div className="counter-box">
                            <i
                              className={`fa ${fact.icon} counter-icon`}
                              aria-hidden="true"
                            ></i>
                            <span className="count-number">{fact.count}</span>{" "}
                            {fact.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <figure className="about-img animate__animated animate__fadeInUp">
                    <img src={profileGirl} className="rounded" alt="About Me" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  

  export default Section2;