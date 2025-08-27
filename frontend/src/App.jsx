import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import LoginModal from './components/auth/LoginModal.jsx';
import CreatorDashboard from './pages/creator/CreatorDashboard.jsx';
import SeriesCreateEdit from './pages/creator/SeriesCreateEdit.jsx';
import ChapterEditor from './pages/creator/ChapterEditor.jsx';
import './styles/globals.css';


/**
 * Home page component - shows different content based on auth state
 * Provides navigation to creator dashboard for logged-in users
 */
function HomePage() {
  const { setIsLoginModalOpen, user, logout } = useAuth();
  
  if (user) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', minHeight: '100vh' }}>
        <h1 style={{ color: 'white', marginBottom: '20px', fontSize: 'var(--text-3xl)' }}>
          M'Anime Reader
        </h1>
        <div style={{ color: 'white', marginBottom: '30px' }}>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: '10px' }}>
            Welcome back, {user.username}!
          </p>
          <p style={{ color: 'var(--gray-400)' }}>
            Ready to create some amazing manga?
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Use Link for proper React Router navigation */}
          <Link to="/creator" className="btn btn-primary btn-lg">
            Creator Dashboard
          </Link>
          <button onClick={logout} className="btn btn-secondary btn-lg">
            Logout
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '100vh' }}>
      <h1 style={{ 
        color: 'white', 
        marginBottom: '20px', 
        fontSize: 'var(--text-4xl)',
        background: 'linear-gradient(135deg, var(--accent), var(--secondary))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        M'Anime Reader
      </h1>
      <p style={{ 
        color: 'var(--gray-400)', 
        marginBottom: '40px',
        fontSize: 'var(--text-lg)',
        maxWidth: '600px',
        margin: '0 auto 40px'
      }}>
        A modern platform for manga creators and readers. Create, publish, and discover amazing stories.
      </p>
      <button 
        onClick={() => setIsLoginModalOpen(true)}
        className="btn btn-primary btn-lg"
      >
        Get Started
      </button>
    </div>
  );
}

/**
 * Main App component with routing setup
 * Provides authentication context and navigation structure
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            
            {/* Creator routes */}
            <Route path="/creator" element={<CreatorDashboard />} />
            <Route path="/creator/series/new" element={<SeriesCreateEdit />} />
            <Route path="/creator/series/:seriesId/edit" element={<SeriesCreateEdit />} />
            <Route path="/creator/series/:seriesId/chapter/new" element={<ChapterEditor />} />
            <Route path="/creator/series/:seriesId/chapter/:chapterId/edit" element={<ChapterEditor />} />
            
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          {/* Global login modal */}
          <LoginModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;