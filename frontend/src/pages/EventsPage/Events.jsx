import React from "react";
import PastEvents from "../../modules/EventsModule/pastEvents/PastEvents";
import UpcomingEventComponent from "../../modules/EventsModule/UpcomingEventComponent/UpcomingEventComponent";
import FutureEvents from "../../modules/EventsModule/futureEvents/FutureEvents";
import TopSpeakers from "../../modules/EventsModule/topSpeakers/TopSpeakers";
import EventHeroSection from "../../modules/EventsModule/heroSection/EventHeroSection";

const Events = () => (
  <div>
    <EventHeroSection />
    <UpcomingEventComponent />
    <PastEvents />
    <FutureEvents />
    <TopSpeakers />
  </div>
);

export default Events;
