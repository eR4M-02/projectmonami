import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import SeriesCard from '../../components/creator/SeriesCard.jsx';
import { BookOpen, Plus, ArrowLeft, BarChart3, TrendingUp } from 'lucide-react';

/**
 * Creator Dashboard - Main hub for creators to manage their manga series
 * This is the central page where creators can view all their series, create new ones,
 * and access management tools. It handles authentication, loading states, and empty states.
 */
const CreatorDashboard = () => {
  // Get authentication context to check if user is logged in and access user data
  const { user, setIsLoginModalOpen } = useAuth();
  
  // State management for the dashboard
  const [series, setSeries] = useState([]); // Array to store user's manga series
  const [loading, setLoading] = useState(true); // Boolean to show/hide loading spinner

  /**
   * Effect hook to fetch user's series data when component mounts or user changes
   * This simulates an API call to get the creator's manga series from the backend
   */
  useEffect(() => {
    // Only fetch data if user is authenticated
    if (user) {
      // Simulate API call with setTimeout (replace with actual API call later)
      setTimeout(() => {
        // Mock data representing the creator's manga series
        // In production, this would come from your backend API
        const mockSeries = [
          {
            id: 1,
            title: 'Adventure Quest',
            cover: 'https://picsum.photos/300/400?random=1', // Placeholder image
            readers: 1234,
            rating: 4.5,
            chapters: 12,
            status: 'ongoing', // Can be: 'ongoing', 'completed', 'hiatus'
            description: 'An epic adventure through mystical lands filled with magic and wonder. Follow our heroes as they discover ancient secrets.',
            lastUpdated: '2024-01-15',
            tags: ['Adventure', 'Fantasy', 'Action']
          },
          {
            id: 2,
            title: 'Magic Academy Chronicles',
            cover: 'https://picsum.photos/300/400?random=2',
            readers: 856,
            rating: 4.2,
            chapters: 8,
            status: 'ongoing',
            description: 'Young wizards learning the art of magic in a prestigious academy where danger lurks in every corridor.',
            lastUpdated: '2024-01-10',
            tags: ['Magic', 'School', 'Fantasy']
          },
          {
            id: 3,
            title: 'Cyber Dreams',
            cover: 'https://picsum.photos/300/400?random=3',
            readers: 2341,
            rating: 4.8,
            chapters: 24,
            status: 'completed',
            description: 'A cyberpunk tale of the future where dreams and reality merge in the digital landscape of Neo Tokyo.',
            lastUpdated: '2024-01-05',
            tags: ['Cyberpunk', 'Sci-Fi', 'Drama']
          }
        ];
        
        // Update state with the fetched series data
        setSeries(mockSeries);
        
        // Hide loading spinner since data has been loaded
        setLoading(false);
      }, 1000); // 1 second delay to simulate network request
    }
  }, [user]); // Dependency array - effect runs when 'user' changes

  /**
   * Authentication Guard
   * If user is not logged in, show the login prompt instead of the dashboard
   * This prevents unauthorized access to creator tools
   */
  if (!user) {
    return <UnauthenticatedView setIsLoginModalOpen={setIsLoginModalOpen} />;
  }

  /**
   * Loading State
   * While data is being fetched, show a loading spinner and message
   * This provides feedback to the user that something is happening
   */
  if (loading) {
    return <LoadingView />;
  }

  /**
   * Main Dashboard Render
   * This is the main dashboard interface that shows when user is authenticated
   * and data has finished loading
   */
  return (
    <div className="creator-dashboard">
      <div className="container">
        
        {/* Dashboard Header Section */}
        {/* Contains navigation, title, and action buttons */}
        <header className="dashboard-header">
          
          {/* Navigation and Title Area */}
          <div className="header-content">
            {/* Breadcrumb navigation to go back to home page */}
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
            
            {/* Page title and welcome message */}
            <div className="header-info">
              <h1 className="dashboard-title">Creator Dashboard</h1>
              <p className="dashboard-subtitle">
                Welcome back, {user.username}! Manage your works and series here.
              </p>
            </div>
          </div>
          
          {/* Action Buttons Section */}
          {/* Contains buttons for analytics and creating new series */}
          <div className="header-actions">

            
            {/* Create New Series button - NOW ENABLED */}
            <Link to="/creator/series/new" className="btn btn-primary">
              <Plus size={16} />
              Create New Series
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        {/* Shows either empty state or series grid based on whether user has series */}
        <main className="dashboard-content">
          {series.length === 0 ? (
            // Empty State: Show when user has no series yet
            <EmptyState />
          ) : (
            // Series Grid: Show when user has series to display
            <div className="series-section">
              
              {/* Section Header with title and actions */}
              <div className="section-header">
                <h2 className="section-title">My Series ({series.length})</h2>
              </div>
              
              {/* Responsive Grid Layout for Series Cards */}
              {/* Grid automatically adjusts: 1 column on mobile, 2 on tablet, 4+ on desktop */}
              <div className="series-grid">
                {series.map((seriesItem) => (
                  <SeriesCard 
                    key={seriesItem.id} // Unique key for React rendering
                    series={seriesItem} // Pass series data to card component
                    onDelete={(id) => {
                      // Handle series deletion when user confirms deletion
                      // Remove the deleted series from the state array
                      setSeries(prev => prev.filter(s => s.id !== id));
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

/**
 * Loading View Component
 * Displays a spinner and loading message while data is being fetched
 * Provides visual feedback that the app is working
 */
const LoadingView = () => (
  <div className="loading-view">
    <div className="loading-content">
      {/* Animated spinner using CSS animation */}
      <div className="spinner-large" />
      <p className="loading-text">Loading your series...</p>
    </div>
  </div>
);

/**
 * Unauthenticated View Component
 * Shows when user is not logged in - prompts them to authenticate
 * Prevents unauthorized access to creator dashboard
 */
const UnauthenticatedView = ({ setIsLoginModalOpen }) => (
  <div className="auth-required">
    <div className="auth-content">
      {/* Large book icon for visual appeal */}
      <BookOpen size={64} className="auth-icon" />
      <h1 className="auth-title">Creator Dashboard</h1>
      <p className="auth-message">
        Please log in to access your creator dashboard and manage your works and series.
      </p>
      {/* Button to trigger login modal */}
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
 * Empty State Component
 * Shows when authenticated user has no series yet
 * Encourages them to create their first series
 */
const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-content">
      {/* Large book icon to represent empty series list */}
      <BookOpen size={64} className="empty-icon" />
      <h2 className="empty-title">No series yet</h2>
      <p className="empty-message">
        Create your first work or series to start building your audience and sharing your stories with the world.
      </p>
      {/* Create series button - NOW ENABLED */}
      <Link to="/creator/series/new" className="btn btn-primary btn-lg">
        <Plus size={20} />
        Create Your First Series
      </Link>
    </div>
  </div>
);

export default CreatorDashboard;