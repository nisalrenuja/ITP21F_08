import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
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

  let loginStatus = false;
  if (process.browser) {
    loginStatus = window.localStorage.getItem("loggedIn") === "true";
  }

  const logout = () => {
    localStorage.setItem("loggedIn", "false");
    window.location.reload();
  };

  return (
    <div className={`${loginStatus ? "" : "navbar-container"}`}>
      <nav
        className={
          navbar
            ? "navbar sticky-top active navbar-expand-lg navbar-light bg"
            : "navbar sticky-top navbar-expand-lg navbar-light bg"
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
                <a className="nav-link navLink" href="/events">
                  Notices
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navLink" href="/clients">
                  Clients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navLink" href="/contact">
                  Contact Us
                </a>
              </li>
              {loginStatus ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link navLink" href="/admin">
                      Admin Panel
                    </a>
                  </li>
                  <li className="profile-icon">
                    <div class="dropdown">
                      <CgProfile
                        size={40}
                        color="#FFFFFF"
                        class="drpdownIcon"
                      />
                      <div className="dropdown-content">
                        <a onClick={logout} href="/">
                          Logout
                        </a>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link navLink" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
