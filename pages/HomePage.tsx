import React from 'react';
import LiveStream from '../components/LiveStream';
import Stats from '../components/Stats';
import Process from '../components/Process';
import Services from '../components/Services';
import Locations from '../components/Locations';
import KakaoReviews from '../components/KakaoReviews';
import CTA from '../components/CTA';

const HomePage: React.FC = () => {
  return (
    <>
      <LiveStream />
      <Stats />
      <Services />
      <Process />
      <KakaoReviews />
      <Locations />
      <CTA />
    </>
  );
};

export default HomePage;
