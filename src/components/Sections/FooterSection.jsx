import { forwardRef } from "react";
import { Helmet } from "react-helmet";
import config from "../../config";
import "./FooterSection.css";

const FooterSection = forwardRef(({ scrollAreaRef }, ref) => {
  const { socialLinks, copyright, shortName, name, telephone } = config.school;

  return (
    <>
      <Helmet>
        <title>{name} - Contact & Support</title>
        <meta
          name="description"
          content="Explore Almaaly's offerings, contact details, and support information."
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: name,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: telephone,
              contactType: "Customer Support",
              areaServed: "EG",
              availableLanguage: "en",
            },
            sameAs: [
              socialLinks.twitter,
              socialLinks.facebook,
              socialLinks.linkedin,
            ],
          })}
        </script>
      </Helmet>
      <div
        ref={ref}
        className="row justify-content-center align-content-center vw-100 p-0 m-0"
        style={{
          background: "linear-gradient(to bottom, #4096ee 0%, #39ced6 100%)",
        }}
      >
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-4 footer-column">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <span className="footer-title">shortName</span>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      About us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      What they say
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Our Programs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Frequently asked questions
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 footer-column">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Life in Almaaly
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Our Events
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      News and articles
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 footer-column">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <span className="footer-title">Contact & Support</span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      <i className="fas fa-phone"></i> {telephone}
                    </span>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i class="fa-solid fa-right-to-bracket me-2"></i> Join us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fas fa-envelope"></i> Contact us
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <i className="fas fa-ellipsis-h"></i>
            </div>

            <div className="row text-center">
              <div className="col-md-4 box">
                <span className="copyright quick-links">{copyright}</span>
              </div>
              <div className="col-md-4 box">
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href={socialLinks.twitter}>
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={socialLinks.facebook}>
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={socialLinks.linkedin}>
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
});

export default FooterSection;
