import React from "react";
import FlatVector from "../../../assets/flat-illustrations/boardpeople.png";
import "./WhatWeDoSection.css";

const WhatWeDoSection = () => (
  <section className="WhatWeDoSectionHome container mt-5">
    <div className="wrap">
      <h2 className="text-center what-we-do-header">
        <strong>Company Performance</strong>
      </h2>
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-6 col-sm-12">
            <h3>
              <strong>Lorem ipsum</strong>
            </h3>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              elementum at egestas rutrum commodo ultrices vitae vel. Velit a
              scelerisque et pharetra, tincidunt pulvinar amet. Tristique morbi
              enim urna viverra massa vehicula quam.
            </p>
          </div>
          <div className="col-md-6 col-sm-12 d-flex justify-content-center">
            <img
              alt="imageFlatVector"
              className="img-fluid d-none d-md-block"
              src={FlatVector}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhatWeDoSection;
