import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './components/Topbar';
import Footer from './components/Footer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-sungshin-cyan selection:text-white">
      <Topbar />
      {/* Topbar는 모바일에서 2줄이므로 여백을 늘립니다. */}
      <main className="pt-24 md:pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
