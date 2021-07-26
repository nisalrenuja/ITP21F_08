import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import speakers from "./Speaker.json";
import "./TopSpeakerStyle.css";
import TopSpeakerCard from "../../../component/TopSpeakerCard/TopSpeakerCard";

const responsive = {
  0: {
    items: 1.3,
  },
  375: {
    items: 1,
  },
  411: {
    items: 1.3,
  },
  414: {
    items: 1.3,
  },
  600: {
    items: 2,
  },
  1400: {
    items: 4,
  },
  900: {
    items: 2.6,
  },
  1000: {
    items: 3,
  },
  1100: {
    items: 3,
  },
  1800: {
    items: 4.9,
  },
};
let slider;
const slideNext = () => {
  slider.next(500);
};
const slidePrev = () => {
  slider.prev(500);
};
const slidePrevKeyBoard = (e) => {
  if (e.keyCode === 37) {
    slidePrev();
  }
};
const slideNextKeyBoard = (e) => {
  if (e.keyCode === 39) {
    slideNext();
  }
};

const TopSpeakers = () => (
  <div className="past-speaker-container">
    <h1 className="event-header">Top Speakers</h1>
    <div className="nav-button-wrapper">
      <div className="view-more">View More</div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div
        onClick={slidePrev}
        onKeyDown={slidePrevKeyBoard}
        role="button"
        tabIndex={0}
      >
        <i className="far fa-arrow-alt-circle-left fa-lg nav-icon" />
      </div>
      &nbsp;&nbsp;&nbsp;
      <div
        onClick={slideNext}
        onKeyDown={slideNextKeyBoard}
        role="button"
        tabIndex={0}
      >
        <i className="far fa-arrow-alt-circle-right fa-lg nav-icon" />
      </div>
    </div>

    <div className="container-fluid">
      <OwlCarousel
        className="owl-theme"
        dots={false}
        loop
        margin={70}
        responsive={responsive}
        ref={(slide) => {
          slider = slide;
        }}
      >
        {speakers.data.map((speaker) => (
          <TopSpeakerCard
            key={speaker.id}
            image={speaker.image}
            title={speaker.title}
            description={speaker.description}
            urls={speaker.socialMediaURLs}
          />
        ))}
      </OwlCarousel>
    </div>
  </div>
);

export default TopSpeakers;
