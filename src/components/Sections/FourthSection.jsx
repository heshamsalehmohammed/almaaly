import { forwardRef } from "react";
import { Helmet } from "react-helmet";
import { Slide, Fade, Zoom } from "react-awesome-reveal";
import config from "../../config";


const FourthSection = forwardRef((props, ref) => {
  const { title, subtitle, description, programs1,programs2 } = config.school.fourthSection;

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        <title>{title} | {config.school.shortName}</title>
        <meta name="description" content={description} />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            name: title,
            educationalCredentialAwarded: subtitle,
            hasPart: [...programs1,...programs2].map((program) => ({
              "@type": "Course",
              name: program.name,
              description: program.description,
            })),
          })}
        </script>
      </Helmet>

      <div
        ref={ref}
        className="row justify-content-center align-content-center vw-100"
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <div className="container mt-0 p-0">
          <div className="row justify-content-center text-center mt-5 mt-sm-0">
            <div className="col-11 col-sm-8 col-md-7 col-lg-5">
              <Slide direction="up">
                <h3 style={{ color: "rgb(2, 2, 120)" }} className="text-shadow-1">
                  {title}
                </h3>
                <h2 className="mb-4 text-shadow-1" style={{ fontWeight: "bold" }}>
                  {subtitle}
                </h2>
                <p className="mb-5 text-shadow-1 fw-bold">{description}</p>
              </Slide>
            </div>
          </div>

          <div className="row justify-content-center text-center text-shadow-1">
            {programs1.map((program, index) => (
              <div className="col-md-4 col-8 mb-4" key={index}>
                <Zoom duration={200}>
                  <Fade duration={500}>
                    <div
                      className="icon-box text-white d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "rgb(2, 2, 120)",
                        borderRadius: "10px",
                      }}
                    >
                      <i className={`fas ${program.icon} fa-2x`}></i>
                    </div>
                  </Fade>
                </Zoom>

                <Slide direction="up">
                  <h5>{program.name}</h5>
                  <p>{program.description}</p>
                </Slide>
              </div>
            ))}
          </div>
          <div className="row justify-content-center text-center text-shadow-1">
            {programs2.map((program, index) => (
              <div className="col-md-4 col-8 mb-4" key={index}>
                <Zoom duration={200}>
                  <Fade duration={500}>
                    <div
                      className="icon-box text-white d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "rgb(2, 2, 120)",
                        borderRadius: "10px",
                      }}
                    >
                      <i className={`fas ${program.icon} fa-2x`}></i>
                    </div>
                  </Fade>
                </Zoom>

                <Slide direction="up">
                  <h5>{program.name}</h5>
                  <p>{program.description}</p>
                </Slide>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});
export default FourthSection;
