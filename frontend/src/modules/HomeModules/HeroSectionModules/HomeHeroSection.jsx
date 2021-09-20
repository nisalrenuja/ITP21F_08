import React from "react";
import "./HomeHeroSection.css";
import HeroHeaderImage from "../../../assets/home/svg-1.svg";

const HomeHeroSection = () => (
  <div className="container-fluid header">
    <div className="home-hero-section-bg" />
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6">
        <p className="home-header-title">
          <b>Greetings</b>
        </p>
        <div>
          <p className="home-header-content">
            "Everyone can rise above their circumstances and achieve success if
            they are dedicated to and passionate about what they do"
            <br></br>
            -Nelson Mandela-
          </p>
        </div>
        <button
          type="button"
          href="/allattendance"
          className="home-header-btn btn btn-success btn-pill"
        >
          Attendance
        </button>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-6">
        <img
          src={HeroHeaderImage}
          alt="home header img"
          className="home-header-img"
        />
      </div>
    </div>
  </div>
);

export default HomeHeroSection;
