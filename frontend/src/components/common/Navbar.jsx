import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { User, BookOpen, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout, setIsLoginModalOpen } = useAuth();
  const location = useLocation();

  return (
    <nav style={{
      background: 'var(--primary)',
      padding: 'var(--spacing-md) 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-md)'
    }}>
      <div className="container flex justify-between items-center">
        <Link 
          to="/" 
          style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            color: 'var(--accent)',
            textDecoration: 'none'
          }}
        >
          M'Anime Reader
        </Link>

        <div className="flex items-center gap-md">
          <Link to="/" className="btn btn-ghost">
            <Home size={16} />
            <span className="hidden sm:inline">Browse</span>
          </Link>
          
          {user ? (
            <>
              <Link to="/creator" className="btn btn-secondary">
                <BookOpen size={16} />
                <span className="hidden sm:inline">Creator Dashboard</span>
              </Link>
              <div className="flex items-center gap-sm">
                <div className="flex items-center gap-xs">
                  <User size={16} />
                  <span className="text-sm hidden md:inline">{user.username}</span>
                </div>
                <button onClick={logout} className="btn btn-ghost">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="btn btn-primary"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;