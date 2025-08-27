import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Star, 
  Edit, 
  Trash2, 
  Plus, 
  MoreVertical, 
  Calendar,
  BookOpen
} from 'lucide-react';

/**
 * SeriesCard - Compact horizontal layout for creator dashboard
 * Shows series cover on left with details on right in a quick overview format
 * Optimized for scanning multiple series at once
 */
const SeriesCard = ({ series, onDelete }) => {
  // State for dropdown menu visibility
  const [showMenu, setShowMenu] = useState(false);
  // State for deletion loading animation
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Handle series deletion with confirmation dialog
   * Shows loading state and calls parent's onDelete function
   */
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${series.title}"?\n\nThis action cannot be undone and will remove all chapters and data associated with this series.`
    );
    
    if (confirmed && onDelete) {
      setIsDeleting(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        onDelete(series.id);
      } catch (error) {
        console.error('Failed to delete series:', error);
        setIsDeleting(false);
      }
    }
    setShowMenu(false);
  };

  /**
   * Get appropriate CSS class for status badge based on series status
   */
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'status-live';
      case 'ongoing': return 'status-draft';
      case 'hiatus': return 'status-incomplete';
      default: return 'status-incomplete';
    }
  };

  /**
   * Format date string for display (e.g., "Jan 15")
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Show deletion loading state
  if (isDeleting) {
    return (
      <div className="series-card-compact deleting">
        <div className="deleting-overlay">
          <div className="spinner" />
          <p>Deleting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="series-card-compact">
      {/* Left Side - Cover Image */}
      <div className="series-cover-compact">
        <img
          src={series.cover}
          alt={`${series.title} cover`}
          className="cover-image-compact"
          loading="lazy"
        />
        
        {/* Status Badge overlaid on cover */}
        <div className="status-badge-overlay">
          <span className={`status-badge ${getStatusClass(series.status)}`}>
            {series.status}
          </span>
        </div>
      </div>

      {/* Right Side - Series Details */}
      <div className="series-details-compact">
        
        {/* Header Row - Title and Actions */}
        <div className="series-header-row">
          <div className="series-title-section">
            <h3 className="series-title-compact" title={series.title}>
              {series.title}
            </h3>
            
            {/* Tags - show first 2 tags */}
            {series.tags && series.tags.length > 0 && (
              <div className="series-tags-compact">
                {series.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="tag-compact">
                    {tag}
                  </span>
                ))}
                {series.tags.length > 2 && (
                  <span className="tag-more-compact">+{series.tags.length - 2}</span>
                )}
              </div>
            )}
          </div>

          {/* Actions Menu */}
          <div className="series-actions-compact">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="menu-trigger-compact"
              aria-label="More actions"
            >
              <MoreVertical size={16} />
            </button>
            
            {showMenu && (
              <>
                {/* Backdrop to close menu */}
                <div 
                  className="menu-backdrop" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="dropdown-menu-compact">
                  <button
                    className="menu-item"
                    onClick={() => setShowMenu(false)}
                    disabled
                  >
                    <Edit size={14} />
                    Edit Series
                  </button>
                  <button
                    onClick={handleDelete}
                    className="menu-item danger"
                  >
                    <Trash2 size={14} />
                    Delete Series
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="series-description-compact">
          {series.description}
        </p>

        {/* Stats Row */}
        <div className="series-stats-compact">
          <div className="stat-group">
            <div className="stat-item-compact">
              <Eye size={14} />
              <span>{series.readers.toLocaleString()} readers</span>
            </div>
            <div className="stat-item-compact">
              <Star size={14} />
              <span>{series.rating} rating</span>
            </div>
            <div className="stat-item-compact">
              <BookOpen size={14} />
              <span>{series.chapters} chapters</span>
            </div>
          </div>

          {/* Last Updated */}
          {series.lastUpdated && (
            <div className="last-updated-compact">
              <Calendar size={12} />
              <span>Updated {formatDate(series.lastUpdated)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="series-actions-row">
          <button
            className="btn btn-primary btn-sm"
            disabled
          >
            <Plus size={14} />
            Add Chapter
          </button>
          <button
            className="btn btn-secondary btn-sm"
            disabled
          >
            <Eye size={14} />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;