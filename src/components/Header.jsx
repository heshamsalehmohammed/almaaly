const Header = () => {

  const handleNavigation = (e, pageNumber) => {
    e.preventDefault();
  };

  return (
    <header id="header">
      <div className="container-fluid">
        <div className="navbar">
          <a href="#" id="logo" title="Elegance by TemplateMo">
            ALMAALY
          </a>
          <div className="navigation-row">
            <nav id="navigation">
              <button type="button" className="navbar-toggle">
                <i className="fa fa-bars"></i>
              </button>
              <div className="nav-box navbar-collapse">
                <ul className="navigation-menu nav navbar-nav navbars" id="nav">
                  <li data-menuanchor="slide01" className="active">
                    <a href="#" onClick={(e) => handleNavigation(e, 0)}>
                      Home
                    </a>
                  </li>
                  <li data-menuanchor="slide02">
                    <a href="#" onClick={(e) => handleNavigation(e, 1)}>
                      About Me
                    </a>
                  </li>
                  <li data-menuanchor="slide03">
                    <a href="#" onClick={(e) => handleNavigation(e, 2)}>
                      Services
                    </a>
                  </li>
                  <li data-menuanchor="slide04">
                    <a href="#" onClick={(e) => handleNavigation(e, 3)}>
                      My Skills
                    </a>
                  </li>
                  <li data-menuanchor="slide05">
                    <a href="#" onClick={(e) => handleNavigation(e, 4)}>
                      My Work
                    </a>
                  </li>
                  <li data-menuanchor="slide06">
                    <a href="#" onClick={(e) => handleNavigation(e, 5)}>
                      Testimonials
                    </a>
                  </li>
                  <li data-menuanchor="slide07">
                    <a href="#" onClick={(e) => handleNavigation(e, 6)}>
                      Contact Me
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};



export default Header;