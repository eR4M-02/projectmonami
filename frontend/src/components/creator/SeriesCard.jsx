import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Star, Edit, Trash2, Plus, MoreVertical } from 'lucide-react';

const SeriesCard = ({ series }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${series.title}"? This action cannot be undone.`)) {
      console.log('Delete series:', series.id);
      // TODO: Implement delete functionality
    }
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Cover Image */}
      <div style={{ position: 'relative' }}>
        <img
          src={series.cover}
          alt={series.title}
          style={{
            width: '100%',
            height: '240px',
            objectFit: 'cover'
          }}
        />
        
        {/* Action Menu */}
        <div style={{
          position: 'absolute',
          top: 'var(--spacing-sm)',
          right: 'var(--spacing-sm)'
        }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="btn btn-ghost btn-sm"
            style={{ 
              background: 'var(--overlay)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <MoreVertical size={14} />
          </button>
          
          {showMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: 'var(--primary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: 'var(--spacing-xs)',
              minWidth: '120px',
              zIndex: 10
            }}>
              <Link
                to={`/creator/series/${series.id}/edit`}
                className="btn btn-ghost btn-sm w-full"
                style={{ justifyContent: 'flex-start' }}
              >
                <Edit size={14} />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-ghost btn-sm w-full"
                style={{ 
                  justifyContent: 'flex-start',
                  color: 'var(--error)'
                }}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div style={{
          position: 'absolute',
          bottom: 'var(--spacing-sm)',
          left: 'var(--spacing-sm)'
        }}>
          <span className={`status-badge ${
            series.status === 'completed' ? 'status-live' : 
            series.status === 'ongoing' ? 'status-draft' : 'status-incomplete'
          }`}>
            {series.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--spacing-lg)' }}>
        <h3 style={{ 
          fontSize: 'var(--text-lg)', 
          fontWeight: '600', 
          marginBottom: 'var(--spacing-sm)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {series.title}
        </h3>

        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--gray-400)',
          marginBottom: 'var(--spacing-md)',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {series.description}
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center" style={{ 
          marginBottom: 'var(--spacing-md)',
          fontSize: 'var(--text-sm)',
          color: 'var(--gray-400)'
        }}>
          <div className="flex items-center gap-xs">
            <Eye size={14} />
            <span>{series.readers.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-xs">
            <Star size={14} fill="currentColor" />
            <span>{series.rating}</span>
          </div>
          <div>
            {series.chapters} chapters
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-sm">
          <Link
            to={`/creator/series/${series.id}/chapter/new`}
            className="btn btn-primary btn-sm flex-1"
          >
            <Plus size={14} />
            Add Chapter
          </Link>
          <Link
            to={`/series/${series.id}`}
            className="btn btn-secondary btn-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;