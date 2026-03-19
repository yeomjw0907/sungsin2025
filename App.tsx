import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import BankPage from './pages/BankPage';
import PhonePage from './pages/PhonePage';
import AdminPage from './pages/AdminPage';
import ExtrasPage from './pages/ExtrasPage';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="bank" element={<BankPage />} />
        <Route path="phone" element={<PhonePage />} />
        <Route path="extras" element={<ExtrasPage />} />
        <Route path="extras/customs-tax" element={<ExtrasPage />} />
        <Route path="extras/coupang-fee" element={<ExtrasPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
