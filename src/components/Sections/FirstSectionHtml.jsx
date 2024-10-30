import { forwardRef } from "react";
import { Helmet } from "react-helmet";
import * as THREE from "three";
import { Button } from "primereact/button";
import { Slide, Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import {
  selectThreeCamera,
  selectThreeSize,
  selectThreeViewport,
} from "../../redux/threeSlice";
import config from "../../config";

export const FirstSectionHtml = forwardRef(({ headerRef }, ref) => {
  const viewport = useSelector(selectThreeViewport);
  const size = useSelector(selectThreeSize);
  const camera = useSelector(selectThreeCamera);

  const { name, shortName, description, url, logoPath, welcomeMessage } = config.school;

  if (!viewport || !size || !camera) return null;

  // Calculate font size
  const fontSize = 20 * Math.min(1, viewport.width / 128);
  const fontResolution = 1000;
  const scale = fontSize / fontResolution;

  // Calculate lower Y offset using boundingBox.yMin
  const lowerYOffset = 2 * -486 * scale;

  // Set text position
  const positionY = viewport.height / 4 + 1;
  const lowerYScene = positionY + lowerYOffset;

  // Convert to screen Y
  const vector = new THREE.Vector3(0, lowerYScene, 0);
  vector.project(camera);

  // Convert NDC to screen Y coordinates
  const screenY = (-vector.y * 0.5 + 0.5) * size.height;

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        <title>{`Welcome to ${shortName}`}</title>
        <meta name="description" content={welcomeMessage} />
        <meta property="og:title" content={`Welcome to ${name}`} />
        <meta property="og:description" content={welcomeMessage} />
        <meta property="og:image" content={logoPath} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />

        {/* JSON-LD for structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: name,
            description: welcomeMessage,
            url: url,
            logo: logoPath,
          })}
        </script>
      </Helmet>

      <div
        ref={ref}
        className="row justify-content-center vw-100 page-1 pt-3"
        style={{
          position: "absolute",
          top: `${screenY}px`,
        }}
      >
        <div className="col-12 pt-4 mt-sm-4">
          <div
            className="welcome-box text-shadow-1"
            style={{
              fontWeight: "bolder",
            }}
          >
            <Slide direction="up">
              <p className="col-sm-6 col-md-8 col-lg-6 desc pt-2 pb-0 mt-4 mb-1 ps-5 pe-5 color-inherit">
                {welcomeMessage}
              </p>
            </Slide>
          </div>
        </div>
        <div className="col-6 pt-4 mt-5 d-flex flex-wrap justify-content-center justify-content-sm-start">
          <Slide direction="up" delay={300}>
            <Fade delay={300}>
              <Button
                className="pe-4 m-2"
                iconPos="right"
                style={{
                  width: "180px",
                  borderRadius: "25px",
                  background: "#000080",
                  borderColor: "#000080",
                  boxShadow: "none",
                }}
                label="Contact Us"
                icon="fa-solid fa-arrow-right-long ms-0"
                onClick={() => {
                  headerRef.current.goTo("contactUs");
                }}
              />
            </Fade>
            <Fade delay={300}>
              <Button
                className="pe-4 m-2"
                iconPos="right"
                style={{
                  width: "180px",
                  borderRadius: "25px",
                  background: "#fff",
                  borderColor: "#fff",
                  boxShadow: "none",
                  color: "rgb(15 23 42 / 1)",
                }}
                label="Join Us"
                icon="fa-solid fa-arrow-right-long ms-0"
              />
            </Fade>
          </Slide>
        </div>
      </div>
    </>
  );
});
