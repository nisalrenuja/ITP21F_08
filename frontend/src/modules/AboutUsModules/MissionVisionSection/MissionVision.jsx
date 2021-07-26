/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './MissionVision.css';
import FlatVector from '../../../assets/flat-illustrations/boardpeople.png';

const MissionVision = () => (
  <section className="mainSection">
    <div className="container main">
      <div className="sec-1">
        <div className="row text-left text-sm-center align-items-center pt-5 pb-md-5 ">
          <div className="col-4 col-md-5 col-sm-8">
            <img alt="image" className="img-fluid" src={FlatVector} />
          </div>

          <div className="col-12 col-md-5">
            <h2>
              <strong>Our Mission</strong>
            </h2>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum at egestas rutrum commodo
              ultrices vitae vel. Velit a scelerisque et pharetra, tincidunt pulvinar amet. Tristique morbi enim urna
              viverra massa vehicula quam.
            </p>
          </div>
        </div>
      </div>

      <div className="row text-left align-items-center pt-5 pb-md-5">
        <div className="col-4 col-md-5 col-sm-8  order-md-5">
          <img alt="image" className="img-fluid" src={FlatVector} />
        </div>

        <div className="col-12 col-md-5">
          <h2>
            <strong>Our Vision</strong>
          </h2>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum at egestas rutrum commodo ultrices
            vitae vel. Velit a scelerisque et pharetra, tincidunt pulvinar amet. Tristique morbi enim urna viverra massa
            vehicula quam.
          </p>
        </div>
      </div>

      <div className="row text-left align-items-center pt-5 pb-md-5">
        <div className="col-4 col-md-5 col-sm-8">
          <img alt="image" className="img-fluid" src={FlatVector} />
        </div>

        <div className="col-12 col-md-5">
          <h2>
            <strong>Our Strategy</strong>
          </h2>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum at egestas rutrum commodo ultrices
            vitae vel. Velit a scelerisque et pharetra, tincidunt pulvinar amet. Tristique morbi enim urna viverra massa
            vehicula quam.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default MissionVision;
