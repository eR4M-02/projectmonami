import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { X, Eye, EyeOff } from 'lucide-react';

const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login({ username: formData.username, password: formData.password });
      } else {
        await signup(formData);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: '600' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button 
            onClick={() => setIsLoginModalOpen(false)}
            className="btn btn-ghost btn-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toggle between Login/Signup */}
        <div style={{
          display: 'flex',
          background: 'var(--gray-800)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-xs)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: 'var(--spacing-sm)',
              background: isLogin ? 'var(--accent)' : 'transparent',
              color: isLogin ? 'var(--text)' : 'var(--gray-400)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: isLogin ? '600' : '400',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: 'var(--spacing-sm)',
              background: !isLogin ? 'var(--accent)' : 'transparent',
              color: !isLogin ? 'var(--text)' : 'var(--gray-400)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: !isLogin ? '600' : '400',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your password"
                style={{ paddingRight: '3rem' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 'var(--spacing-md)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--gray-400)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
            style={{ marginTop: 'var(--spacing-lg)' }}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Processing...
              </>
            ) : (
              isLogin ? 'Login' : 'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;