import React from 'react';
import './WhatWeDoSection.css';
import PropTypes from 'prop-types';
import items from './WhatWeDoSectionData.json';

const Card = ({ icon, description }) => (
  <div className="card about-us-card">
    <div className="d-flex justify-content-center mt-4">
      <i className={icon} />
    </div>
    <p className="d-flex justify-content-center mt-3 content">{description}</p>
  </div>
);

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const WhatWeDoSection = () => (
  <div className="container">
    <h1 className="text-center mt-4 title">What We Do?</h1>
    <div className="row mt-4">
      {items.data.map((item) => (
        <div className="col-md-3 mb-4" key={item.id}>
          <Card icon={item.icon} description={item.description} />
        </div>
      ))}
    </div>
  </div>
);

export default WhatWeDoSection;
