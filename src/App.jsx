import React, { useContext } from 'react';
import { Router, Routes, Route } from './router/hashRouter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import TestPage from './pages/TestPage';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PaymentPage from './pages/PaymentPage';
import CertificatesPage from './pages/CertificatesPage';
import NotificationsPage from './pages/NotificationsPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import HelpCenterPage from './pages/HelpCenterPage';
import PartnersPage from './pages/PartnersPage';
import { AppProvider, AppContext } from './context/AppContext';
import AuthModal from './components/AuthModal';

const AppContent = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col">
      {/* Navbar will show links, but if they click them and they are not logged in, Navbar handles it or they are shown Login */}
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/learning" element={isLoggedIn ? <LearningPage /> : <LoginPage />} />
          <Route path="/test" element={isLoggedIn ? <TestPage /> : <LoginPage />} />
          <Route path="/tasks" element={isLoggedIn ? <TasksPage /> : <LoginPage />} />
          <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <LoginPage />} />
          <Route path="/payment" element={isLoggedIn ? <PaymentPage /> : <LoginPage />} />
          <Route path="/certificates" element={isLoggedIn ? <CertificatesPage /> : <LoginPage />} />
          <Route path="/notifications" element={isLoggedIn ? <NotificationsPage /> : <LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/partners" element={<PartnersPage />} />
        </Routes>
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
