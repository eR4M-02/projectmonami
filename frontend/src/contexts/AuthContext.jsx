import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // These hooks should be at the top level - NOT inside conditions or loops
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ id: 1, username: 'demo_creator', email: 'demo@example.com' });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const mockUser = { id: 1, username: credentials.username, email: credentials.email || 'demo@example.com' };
    setUser(mockUser);
    localStorage.setItem('authToken', 'mock-token');
    setIsLoginModalOpen(false);
    return mockUser;
  };

  const signup = async (userData) => {
    const mockUser = { id: 1, username: userData.username, email: userData.email };
    setUser(mockUser);
    localStorage.setItem('authToken', 'mock-token');
    setIsLoginModalOpen(false);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isLoginModalOpen,
    setIsLoginModalOpen
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};