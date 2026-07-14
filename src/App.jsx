import React, { useContext, useEffect, useState } from 'react';
import { Router, Routes, Route, Outlet, Navigate, useLocation } from './router/hashRouter';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { AppProvider, AppContext } from './context/AppContext';
import AuthModal from './components/AuthModal';

// ============ Layout (Nested Route) ============
const MainLayout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col">
      <Navbar />
      
      {/* Route Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d1a]/85 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-cyan-500/20 border-b-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
            </div>
            <span className="text-purple-400 font-extrabold text-sm tracking-wider uppercase animate-pulse">
              LuminaEdu...
            </span>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Outlet — barcha child routelar shu yerga render bo'ladi */}
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
};

// ============ Protected Route ============
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// ============ App ============
const AppContent = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-quad',
    });
  }, []);

  return (
    <Routes>
      {/* ====== Public Layout Routes (Nested) ====== */}
      <Route element={<MainLayout />}>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/partners" element={<PartnersPage />} />

        {/* Protected pages (login talab qilinadi) */}
        <Route
          path="/learning"
          element={
            <ProtectedRoute>
              <LearningPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <CertificatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* ====== Dashboard — Nested Routes ichida ====== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
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
