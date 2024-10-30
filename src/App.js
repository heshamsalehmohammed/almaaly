import { useRef } from "react";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./bootstrap-addon.css";

import "./App.css";
import SocialIcons from "./components/SocilaIcons";
import ThreeCanvas from "./components/ThreeCanvas";
import ScrollArea from "./components/ScrollArea";
import config from "./config";

const App = () => {
  const headerRef = useRef();
  const domRef = useRef();
  const threeSceneRef = useRef();

  const {
    name,
    description,
    descriptionContent,
    url,
    logoPath,
    ogImagePath,
    address,
    telephone,
    foundingDate,
    socialLinks,
  } = config.school;

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={descriptionContent} />
        <meta property="og:image" content={ogImagePath} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "School",
            name: name,
            url: url,
            logo: logoPath,
            address: {
              "@type": "PostalAddress",
              streetAddress: address.streetAddress,
              addressLocality: address.addressLocality,
              addressRegion: address.addressRegion,
              postalCode: address.postalCode,
              addressCountry: address.addressCountry,
            },
            telephone: telephone,
            description: description,
            foundingDate: foundingDate,
            sameAs: [socialLinks.facebook, socialLinks.twitter, socialLinks.linkedin],
          })}
        </script>
      </Helmet>

      <Header ref={headerRef} domRef={domRef} threeSceneRef={threeSceneRef} />
      <ThreeCanvas ref={threeSceneRef} domRef={domRef} />
      <ScrollArea ref={domRef} threeSceneRef={threeSceneRef} headerRef={headerRef} />
      <SocialIcons />
    </>
  );
};

export default App;