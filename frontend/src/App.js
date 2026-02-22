import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import FlashcardsPage from './pages/FlashcardsPage';
import FlashcardViewerPage from './pages/FlashcardViewerPage';
import QuizzesPage from './pages/QuizzesPage';
import QuizTakePage from './pages/QuizTakePage';
import QuizResultPage from './pages/QuizResultPage';
import ProfilePage from './pages/ProfilePage';
// Static pages
import PrivacyPage from './pages/static/PrivacyPage';
import TermsPage from './pages/static/TermsPage';
import AboutPage from './pages/static/AboutPage';
import BlogPage from './pages/static/BlogPage';
import CareersPage from './pages/static/CareersPage';
import FAQPage from './pages/static/FAQPage';
import CookiesPage from './pages/static/CookiesPage';
import SecurityPage from './pages/static/SecurityPage';
import ContactPage from './pages/static/ContactPage';
import PartnershipsPage from './pages/static/PartnershipsPage';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="spinner" style={{ width: 36, height: 36 }} />
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return !user ? children : <Navigate to="/app/dashboard" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* Main */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

    {/* Static pages */}
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/careers" element={<CareersPage />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/cookies" element={<CookiesPage />} />
    <Route path="/security" element={<SecurityPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/partnerships" element={<PartnershipsPage />} />

    {/* App routes */}
    <Route path="/app" element={<PrivateRoute><Layout /></PrivateRoute>}>
      <Route index element={<Navigate to="/app/dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="documents" element={<DocumentsPage />} />
      <Route path="documents/:id" element={<DocumentDetailPage />} />
      <Route path="flashcards" element={<FlashcardsPage />} />
      <Route path="flashcards/:id" element={<FlashcardViewerPage />} />
      <Route path="quizzes" element={<QuizzesPage />} />
      <Route path="quizzes/:id/take" element={<QuizTakePage />} />
      <Route path="quizzes/:id/results" element={<QuizResultPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
    <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
  </Routes>
);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                fontSize: '0.875rem',
              },
              success: { iconTheme: { primary: '#34d399', secondary: 'var(--bg-card)' } },
              error: { iconTheme: { primary: '#f87171', secondary: 'var(--bg-card)' } },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}