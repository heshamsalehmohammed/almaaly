import React from "react";
import { Helmet } from "react-helmet";
import config from "../config";

const SocialIcons = () => {
  const { name, url, logoPath, socialLinks } = config.school;

  return (
    <>
      {/* React Helmet for SEO */}
      <Helmet>
        {/* JSON-LD structured data for social profiles */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: name,
            url: url,
            logo: logoPath,
            sameAs: [socialLinks.facebook, socialLinks.twitter, socialLinks.linkedin],
          })}
        </script>
      </Helmet>

      {/* Social Icons */}
      <div id="social-icons">
        <div className="text-right">
          <ul className="social-icons">
            <li>
              <a
                href={socialLinks.facebook}
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                <span className="sr-only">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href={socialLinks.twitter}
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                <span className="sr-only">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href={socialLinks.linkedin}
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SocialIcons;
