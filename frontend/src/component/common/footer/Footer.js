import React from "react";
import Wave from "react-wavify";
import "./Footer.css";
import Logo from "../../../assets/images/logo/logo.svg";
//testing
const footer = () => (
  <footer className="footer-section">
    <div className="footerwave">
      <Wave
        fill="#2cafd4"
        paused={false}
        options={{
          height: 40,
          amplitude: 30,
          speed: 0.2,
          points: 3
        }}
      />
    </div>
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
                <p></p>
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
                  Don’t forget to subscribe to our newsletters, enter your
                  e-mail here.
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
