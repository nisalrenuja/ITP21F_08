import React from "react";
import PropTypes from "prop-types";
import "./SpeakerCardStyle.css";

const TopSpeakersformerCard = ({ image, title, description, urls }) => (
  <div className="card top-speaker-card mb-5 mt-3">
    <div className="d-flex justify-content-center">
      <img src={image} className="top-speaker-img" alt="speaker" />
    </div>
    <h4 className="top-speaker-name">{title}</h4>
    <p className="top-speaker-description">{description}</p>
    <div className="d-flex justify-content-center">
      {urls.fb && (
        <a href={urls.fb} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook fa-lg p-1" />
        </a>
      )}
      {urls.instagram && (
        <a href={urls.instagram} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram fa-lg p-1" />
        </a>
      )}
      {urls.twitter && (
        <a href={urls.twitter} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter fa-lg p-1" />
        </a>
      )}
      {urls.linkedIn && (
        <a href={urls.linkedIn} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin fa-lg p-1" />
        </a>
      )}
      {urls.web && (
        <a href={urls.web} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-globe fa-lg p-1" />
        </a>
      )}
    </div>
    <div className="mb-3 mt-3">
      <button className="btn btn-success speaker-btn" type="button">
        VIEW MORE
      </button>
    </div>
  </div>
);

TopSpeakersformerCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  urls: PropTypes.object.isRequired,
};

export default TopSpeakersformerCard;
