import React from "react";
import HeroSection from "../../modules/AboutUsModules/AboutUsHeroSection/HeroSection";
import WhatWeDoSection from "../../modules/AboutUsModules/WhatWeDoSection/WhatWeDoSection";
import What from "../../modules/AboutUsModules/WhatSection/What";
import MissionVission from "../../modules/AboutUsModules/MissionVisionSection/MissionVision";

const AboutUs = () => (
  <div>
    <HeroSection />
    <What />
    <MissionVission />
    <WhatWeDoSection />
  </div>
);

export default AboutUs;
