import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AddUserPage from './pages/AddUserPage';
import GiveKudosPage from './pages/GiveKudosPage';
import LandingPage from './pages/LandingPage';
import AnalyticsPage from './pages/AnalyticsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/give-kudos" element={<GiveKudosPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
