import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../../../assets/images/logo/logo.svg";

function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY > 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <div className="navbar-container">
      <nav
        className={
          navbar
            ? "navbar fixed-top active navbar-expand-lg navbar-light bg"
            : "navbar fixed-top navbar-expand-lg navbar-light bg"
        }
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="Logo" className="img-logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0" />

            <ul className="navbar-nav d-flex me-2">
              <li className="nav-item">
                <a className="nav-link navLink" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navLink" href="/">
                  Notices
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navLink" href="/">
                  Clients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navLink" href="/">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navLink" href="/">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
