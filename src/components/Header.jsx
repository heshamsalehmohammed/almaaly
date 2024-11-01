import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Helmet } from "react-helmet";
import { Slide } from "react-awesome-reveal";
import { ToggleButton } from "primereact/togglebutton";
import "./Header.css";
import { getCurrentLanguage } from "../helpers";

function LanguageSwitcher() {
  const currentPath = window.location.pathname.replace(/^\/(en|ar)/, "");

  const switchLanguage = (lang) => {
    window.location.pathname = `/${lang}${currentPath}`;
  };


  return (
    <ToggleButton
    className="switcher-button"
      onLabel="ar"
      offLabel="en"
      checked={getCurrentLanguage() === 'ar'}
      onChange={(e) => {
        const newLang = e.value ? "ar" : "en";
        switchLanguage(newLang);
      }}
    />
  );
}

const Header = forwardRef(({ domRef, threeSceneRef, config }, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { url, shortName } = config.school;

  const navItems = [
    {
      id: "home",
      label: "Home",
      onClick: (e) => {
        e?.preventDefault();
        setShowMenu(false);
        domRef.current.scrollAreaRef.current.scrollTop = 0;
      },
      deleted: false,
    },
    {
      id: "aboutUs",
      label: "About Us",
      onClick: (e) => {
        e?.preventDefault();
        setShowMenu(false);
        domRef.current.scrollAreaRef.current.scrollTop = window.innerHeight;
      },
      deleted: false,
    },
    {
      id: "contactUs",
      label: "Contact Us",
      onClick: (e) => {
        e?.preventDefault();
        setShowMenu(false);
        const h1 = window.innerHeight;
        const { height: h2 } =
          domRef.current.secondSectionRef.current.getBoundingClientRect();
        const { height: h3 } =
          domRef.current.thirdSectionRef.current.getBoundingClientRect();
        const { height: h4 } =
          domRef.current.fourthSectionRef.current.getBoundingClientRect();
        const { height: h5 } =
          domRef.current.bottomElementRef.current.getBoundingClientRect();

        const { height: h6 } =
          domRef.current.studentsGallarySectionRef.current.getBoundingClientRect();

        const { height: h7 } =
          domRef.current.quotesSectionRef.current.getBoundingClientRect();

        const h8 = window.innerHeight + 5;

        const y = h1 + h2 + h3 + h4 + h5 + h6 + h7 + h8;

        domRef.current.scrollAreaRef.current.scrollTop = y;
      },
      deleted: false,
    },
  ];

  useImperativeHandle(ref, () => ({
    goTo: (sectionId) => {
      const navItemToClick = navItems.find((ni) => ni.id === sectionId);
      navItemToClick.onClick();
    },
  }));

  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      {/*       <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: navItems.filter((nv) => !nv.deleted).map((item) => item.label),
            url: navItems
              .filter((nv) => !nv.deleted)
              .map((item) => `${url}/#${item.id}`),
          })}
        </script>
      </Helmet> */}

      <header className="header1 w-25">
        <div className="container-fluid">
          <div className="d-flex justify-content-start align-items-center">
            <a
              className="cursor-pointer"
              id="logo"
              onClick={(e) => {
                e?.preventDefault();
                const navItemToClick = navItems.find((ni) => ni.id === "home");
                navItemToClick.onClick();
              }}
            >
              {shortName}
            </a>
          </div>
        </div>
      </header>

      <header className="header2">
        <div className="container-fluid">
          <Slide direction="down">
            <div
              className={`d-flex ${
                !isMobile ? "justify-content-center" : "justify-content-end"
              } align-items-center`}
            >
              <ul
                className="navbar-nav p-2 pt-3"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "rgb(222 222 222 / 25%)",
                }}
              >
                <LanguageSwitcher />
                {!isMobile &&
                  navItems
                    .filter((nv) => !nv.deleted)
                    .map((item, index) => (
                      <li key={`nav-bar-item-${index}`} className="mx-3">
                        <a href={`#${item.id}`} onClick={item.onClick}>
                          {item.label}
                        </a>
                      </li>
                    ))}

                <div
                  className="-mt-15 cursor-pointer mx-3"
                  style={{ fontSize: "1.5rem" }}
                  onClick={toggleShowMenu}
                >
                  <i
                    className={`fa-solid ${showMenu ? "fa-xmark" : "fa-bars"}`}
                  ></i>
                </div>
              </ul>
            </div>
          </Slide>
        </div>
      </header>
      {showMenu && (
        <div className={`menu-container ${showMenu ? "active" : "deactive"}`}>
          <div className="overlay" />
          <div className="menu-items">
            <ul className="p-0 display-1">
              {navItems
                .filter((nv) => !nv.deleted)
                .map((item, index) => (
                  <li key={`nav-menu-item-${index}`} className="mb-3">
                    <a href={`#${item.id}`} onClick={item.onClick}>
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
});

export default Header;
