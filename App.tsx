import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Process from './components/Process';
import Services from './components/Services';
import Locations from './components/Locations';
import Testimonials from './components/Testimonials';
import GrowthChart from './components/GrowthChart';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Smooth scroll behavior global style
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-sungshin-cyan selection:text-white">
      <main>
        <Hero />
        <Stats />
        <Process />
        <Services />
        <Locations />
        <Testimonials />
        <GrowthChart />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;