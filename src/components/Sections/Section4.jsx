

const Section4 = () => (

        <div className="row w-100 justify-content-center  ">
          <div className="col-md-8 col-10 wide-col-laptop">
            <div className="title-block    ">
              <span>My Skills</span>
              <h2>What I’m Good At?</h2>
            </div>
            <div className="skills-row   animate__fadeInDown">
              <div className="row">
                {[
                  { title: "HTML CSS", percent: 70 },
                  { title: "PSD Design", percent: 90 },
                  { title: "Social Media", percent: 70 },
                  { title: "Leadership", percent: 90 },
                ].map((skill, index) => (
                  <div
                    className="col-md-8 offset-md-2 skill-item    "
                    key={index}
                  >
                    <h6>{skill.title}</h6>
                    <div className="skill-bar">
                      <span>{skill.percent}%</span>
                      <div
                        className={`filled-bar filled-bar-${
                          index % 2 === 0 ? "1" : "2"
                        }`}
                        style={{ width: `${skill.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

  );




  export default Section4