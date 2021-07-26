import React from "react";
import WhatWeDoSection from "../../modules/HomeModules/WhatWeDoSection/WhatWeDoSection";
import HomeHeroSection from "../../modules/HomeModules/HeroSectionModules/HomeHeroSection";
import UpcomingEventComponent from "../../modules/EventsModule/UpcomingEventComponent/UpcomingEventComponent";
import PastEvents from "../../modules/EventsModule/pastEvents/PastEvents";
import UpcomingWebinarsComponent from "../../modules/HomeModules/UpcomingWebinarsComponent/UpcomingWebinarsComponent";
import BlogsComponent from "../../modules/HomeModules/BlogsComponent/BlogsComponent";
import "./Home.css";

const Home = () => (
  <div>
    <HomeHeroSection />
    <WhatWeDoSection />
    <UpcomingEventComponent />
    <BlogsComponent />
  </div>
);

export default Home;
