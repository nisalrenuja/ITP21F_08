import React from "react";
import "./UpcomingEventComponent.css";
import upcomingEvents from "./UpcomingEventData.json";

const UpcomingEventComponent = () => (
  <section className="UpcomingEventComponent container-fluid mt-5">
    <h2 className="upcomming-title">
      <strong>Upcoming Event</strong>
    </h2>
    <div>
      <div className="card mt-5 mb-5 upcomming-event-card">
        <div className="row ">
          <div className="col-lg-5 col-md-12 col-sm-12 upcomming-event-img-div">
            <img
              alt="imageFlatVector"
              className="img-fluid upcomming-event-img"
              src={upcomingEvents.data.image}
            />
          </div>

          <div className="col-lg-7 col-md-12 col-sm-12 p-5 upcomming-event-col">
            <h2>
              <strong>{upcomingEvents.data.title}</strong>
            </h2>
            <p className="lead mt-3">{upcomingEvents.data.description}</p>
            <button type="button" className="btn btn-success btn-pill mt-3">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default UpcomingEventComponent;
