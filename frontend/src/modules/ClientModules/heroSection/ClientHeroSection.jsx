import React from "react";
import "./ClientHeroSection.css";
import clientHeroHeaderImage from "../../../assets/Clients/ClientsHeroVector.svg";

const clientHeroSection = () => (
  <div className="container-fluid header">
    <div className="eventSectionGb" />
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 text-div">
        <div className="col-12">
          <p className="exploreText">Our Clients</p>
        </div>
        <div className="col-12 event-search">
          <input type="text" className="form-control searchBox" />
          <button type="button" className="btn searchButton">
            <i className="fa fa-search" />
          </button>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-item-center">
        <img
          src={clientHeroHeaderImage}
          alt="Event header img"
          className="event-header-img"
        />
      </div>
    </div>
  </div>
);

export default clientHeroSection;
