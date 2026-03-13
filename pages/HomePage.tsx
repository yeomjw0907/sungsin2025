import React from 'react';
import Hero from '../components/Hero';
import LiveStream from '../components/LiveStream';
import Stats from '../components/Stats';
import Process from '../components/Process';
import Services from '../components/Services';
import Locations from '../components/Locations';
import Testimonials from '../components/Testimonials';
import KakaoReviews from '../components/KakaoReviews';
import GrowthChart from '../components/GrowthChart';
import CTA from '../components/CTA';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <KakaoReviews />
      <LiveStream />
      <Stats />
      <Process />
      <Services />
      <Locations />
      <Testimonials />
      <GrowthChart />
      <CTA />
    </>
  );
};

export default HomePage;
