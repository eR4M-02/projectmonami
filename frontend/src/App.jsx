import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import LoginModal from './components/auth/LoginModal.jsx';
import './styles/globals.css';

// Test component inside the AuthProvider
function TestLoginButton() {
  const { setIsLoginModalOpen, user, logout } = useAuth();
  
  if (user) {
    return (
      <div style={{ color: 'white' }}>
        <p>Welcome, {user.username}!</p>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </div>
    );
  }
  
  return (
    <button 
      onClick={() => setIsLoginModalOpen(true)}
      className="btn btn-primary"
    >
      Test Login Modal
    </button>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', marginBottom: '20px' }}>M'Anime Reader - Auth Test</h1>
          <TestLoginButton />
        </div>
        <LoginModal />
      </div>
    </AuthProvider>
  );
}

export default App;