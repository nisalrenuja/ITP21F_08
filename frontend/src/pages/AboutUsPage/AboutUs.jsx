import React from 'react';
import HeroSection from '../../modules/AboutUsModules/AboutUsHeroSection/HeroSection';
import WhatWeDoSection from '../../modules/AboutUsModules/WhatWeDoSection/WhatWeDoSection';
import WhatMsClubSection from '../../modules/AboutUsModules/WhatMsClubSection/WhatMsClub';
import MissionVission from '../../modules/AboutUsModules/MissionVisionSection/MissionVision';

const AboutUs = () => (
  <div>
    <HeroSection />
    <WhatMsClubSection />
    <MissionVission />
    <WhatWeDoSection />
  </div>
);

export default AboutUs;
