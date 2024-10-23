import { useEffect, useState } from "react";
import {
  Slide,
  Fade,
  JackInTheBox,
  Roll,
  Zoom,
  Bounce,
} from "react-awesome-reveal";
import './Header.css'

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { label: "Home", onClick: (e) => e.preventDefault() },
    { label: "About Us", onClick: (e) => e.preventDefault() },
    { label: "Contact Us", onClick: (e) => e.preventDefault() },
  ];

  // Function to check the window width and update state
  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  };

  useEffect(() => {
    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
  }, []);


  const toggleShowMenu = ()=>{
    setShowMenu((prev)=> !prev)
  }

  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <div className="d-flex justify-content-start align-items-center">
            <a href="#" id="logo">
              ALMAALY
            </a>
          </div>
        </div>
      </header>

      <header className="header">
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
                {!isMobile && // Only show these items if not mobile
                  navItems.map((item, index) => (
                    <li key={`nav-bar-item-${index}`} className="mx-3">
                      <a href="#" onClick={item.onClick}>
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
      {showMenu && <div className={`menu-container ${showMenu?'active':'deactive'}`}>
        <div className="overlay" />
        <div className="menu-items">
          <ul className="p-0 display-1">
            {navItems.map((item, index) => (
              <li key={`nav-menu-item-${index}`} className="mb-3" >
                <a href="#" onClick={item.onClick}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>}
    </>
  );
};

export default Header;
