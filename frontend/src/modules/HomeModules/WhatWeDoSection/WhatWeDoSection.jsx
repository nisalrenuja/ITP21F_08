import React from "react";
import FlatVector from "../../../assets/flat-illustrations/notices.svg";
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
            <h3></h3>
            <p className="lead">
              "None of us, including me, ever do great things. But we can all do
              small things, with great love, and together we can do something
              wonderful." -Mother Theresa-
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
