// File: frontend/src/App.jsx
import React, { useState } from 'react';

// Import all the necessary components
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import ResidentDashboard from './components/ResidentDashboard';

// Import the single CSS file
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'ROLE_ADMIN':
        return <AdminDashboard user={currentUser} />;
      case 'ROLE_STAFF':
        return <StaffDashboard user={currentUser} />;
      case 'ROLE_RESIDENT':
        return <ResidentDashboard user={currentUser} />;
      default:
        return <p>Unknown role. Please contact support.</p>;
    }
  };

  const renderAuthPage = () => {
    if (view === 'login') {
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setView('signup')} />;
    } else {
      return <SignupPage onNavigateToLogin={() => setView('login')} />;
    }
  };

  return (
    <div className="app-container">
      {!currentUser ? (
        renderAuthPage()
      ) : (
        <div>
          <header className="app-header">
            <nav className="app-nav">
              <h1>Smart Waste Management</h1>
              <div className="user-info">
                <span>Welcome, {currentUser.name}!</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            </nav>
          </header>
          <main className="main-content">
            {renderDashboard()}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;