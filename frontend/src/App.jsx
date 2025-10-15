// File: frontend/src/App.jsx
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import ResidentDashboard from './components/ResidentDashboard';
import Sidebar from './components/Sidebar';
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

  // The return statement is the main change. We use a React Fragment (<>)
  // to avoid adding an unnecessary wrapper div around the auth pages.
  return (
    <>
      {!currentUser ? (
        // If logged out, render the auth page directly.
        // The centering is handled by the .login-container class inside the LoginPage component.
        renderAuthPage()
      ) : (
        // If logged in, render the main dashboard layout with the sidebar.
        <div className="app-wrapper">
          <Sidebar />
          <div className="content-wrapper">
            <header className="app-header">
              <div className="user-info">
                <span>Welcome, {currentUser.name}!</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            </header>
            <main className="main-content">
              {renderDashboard()}
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;