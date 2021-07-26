import React from 'react';
import PropTypes from 'prop-types';
import './EventCardStyle.css';
import moment from 'moment';

const EventCardComponent = ({ image, title, tags, datetime }) => (
  <div className="event-card card mb-3 mt-3">
    <div>
      <img className="past-event-img" src={image} alt="Card cap" />
    </div>

    <div className="card-body">
      {tags &&
        tags.map((tag) => (
          <span key={tag} className="badge rounded-pill bg-event event-tags text-dark">
            {tag.toUpperCase()}
          </span>
        ))}
      <div>
        <h5 className="card-title">{title}</h5>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Morbi elementum at egestas rutrum commodo.
        </p>
      </div>
      <div className="d-flex justify-content-center">
        <i className="fas fa-calendar-alt fa-lg mt-1" />
        <span className="badge rounded-pill event-date text-dark">{moment(datetime).format('lll')}</span>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-success event-btn btn-sm" type="button">
          MORE INFO
        </button>
      </div>
    </div>
  </div>
);

EventCardComponent.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  datetime: PropTypes.string.isRequired,
};

export default EventCardComponent;
