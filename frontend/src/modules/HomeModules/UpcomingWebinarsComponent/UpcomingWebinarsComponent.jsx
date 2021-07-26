import React from 'react';
import './UpcomingWebinarsComponent.css';
import webinarEvents from './UpcomingWebinarsData.json';

const UpcomingWebinarsComponent = () => (
  <section className="UpcomingWebinarsComponent container-fluid mt-3">
    <h2 className="text-left upcomming-title">
      <strong>Upcoming Webinars</strong>
    </h2>
    <div>
      <div className="card mt-5 mb-5 upcomming-webinar-card">
        <div className="row ">
          <div className="col-lg-5 col-md-12 col-sm-12 upcomming-webinar-img-div d-xl-none">
            <img alt="imageFlatVector" className="img-fluid upcomming-webinar-img" src={webinarEvents.data.image} />
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12 p-5  upcomming-webinar-col">
            <h2>
              <strong>{webinarEvents.data.title}</strong>
            </h2>
            <p className="lead mt-3">{webinarEvents.data.description}</p>
            <button type="button" className="btn btn-success btn-pill mt-3">
              Read More
            </button>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 upcomming-webinar-img-div d-none d-xl-block">
            <img alt="imageFlatVector" className="img-fluid upcomming-webinar-img" src={webinarEvents.data.image} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default UpcomingWebinarsComponent;
