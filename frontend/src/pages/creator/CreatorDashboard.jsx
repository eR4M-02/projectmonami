import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { BookOpen, Plus, ArrowLeft } from 'lucide-react';

/**
 * Creator Dashboard component
 * Protected route that requires authentication
 * Shows creator-specific tools and content management
 */
const CreatorDashboard = () => {
  const { user, setIsLoginModalOpen } = useAuth();

  // Authentication guard - redirect to login if not authenticated
  if (!user) {
    return <UnauthenticatedView setIsLoginModalOpen={setIsLoginModalOpen} />;
  }

  // Main dashboard view for authenticated creators
  return (
    <div className="creator-dashboard">
      <div className="container">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
            <div className="header-info">
              <h1 className="dashboard-title">Creator Dashboard</h1>
              <p className="dashboard-subtitle">
                Welcome back, {user.username}! Manage your manga series here.
              </p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="header-actions">
            <button className="btn btn-primary">
              <Plus size={16} />
              Create New Series
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="dashboard-content">
          <PlaceholderContent />
        </main>
      </div>
    </div>
  );
};

/**
 * Component shown to unauthenticated users
 * Provides clear call-to-action to log in
 */
const UnauthenticatedView = ({ setIsLoginModalOpen }) => (
  <div className="auth-required">
    <div className="auth-content">
      <BookOpen size={64} className="auth-icon" />
      <h1 className="auth-title">Creator Dashboard</h1>
      <p className="auth-message">
        Please log in to access your creator dashboard and manage your manga series.
      </p>
      <button 
        onClick={() => setIsLoginModalOpen(true)} 
        className="btn btn-primary btn-lg"
      >
        Login / Sign Up
      </button>
    </div>
  </div>
);

/**
 * Placeholder content component
 * Will be replaced with actual dashboard features
 */
const PlaceholderContent = () => (
  <div className="placeholder-content">
    <div className="placeholder-card">
      <BookOpen size={48} className="placeholder-icon" />
      <h2 className="placeholder-title">
        Dashboard Coming Soon
      </h2>
      <p className="placeholder-text">
        This is where your series management, chapter uploads, and creator tools will appear.
        <br />
        Features in development:
      </p>
      <ul className="feature-list">
        <li>Series creation and management</li>
        <li>Chapter upload with drag-and-drop</li>
        <li>Reader analytics and statistics</li>
        <li>Content organization tools</li>
      </ul>
    </div>
  </div>
);

export default CreatorDashboard;