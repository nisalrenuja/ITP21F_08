import React from "react";
import "./Footer.css";
import Logo from "../../../assets/images/logo/logo.svg";

const footer = () => (
  <footer className="footer-section">
    <div className="container">
      <div className="footer-content pt-5 pb-5">
        <div className="row">
          <div className="col-xl-4 col-lg-4 mb-50">
            <div className="footer-widget">
              <div className="footer-logo">
                <a href="index.html">
                  <img
                    src={Logo}
                    className="img-fluid"
                    width="150px"
                    alt="logo"
                  />
                </a>
              </div>
              <div className="footer-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Deleniti magni maiores molestias suscipit tempore? Asperiores
                  aut beatae doloremque, enim fugit, illum itaque mollitia nobis
                  optio quo ratione, repudiandae voluptas voluptates.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>Useful Links</h3>
              </div>
              <ul>
                <li>
                  <a href="https://github.com/nisalrenuja">Announcements</a>
                </li>
                <li>
                  <a href="https://github.com/nisalrenuja">Events</a>
                </li>
                <li>
                  <a href="https://github.com/nisalrenuja">Notices</a>
                </li>
                <li>
                  <a href="https://github.com/nisalrenuja">About</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>Subscribe</h3>
              </div>
              <div className="footer-text mb-25">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  aliquid asperiores dolores harum laboriosam, maiores nobis
                  quae repudiandae tempora voluptatem? Autem esse facilis neque
                  nihil nobis perspiciatis soluta sunt vero!
                </p>
              </div>
              <div className="subscribe-form">
                <form action="#">
                  <input type="text" placeholder="Email Address" />
                  <button type="submit">
                    <i className="fa fa-envelope" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="copyright-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 text-center">
            <div className="copyright-text">
              <p>
                Copyright &copy; 2021, All Right Reserved{" "}
                <a href="https://github.com/nisalrenuja">Jayasighe & Company</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default footer;
