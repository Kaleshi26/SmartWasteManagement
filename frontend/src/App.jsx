// File: frontend/src/App.jsx
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import ResidentDashboard from './components/ResidentDashboard';
import BillingPayments from './components/BillingPayments';
import MyBills from './components/MyBills';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };

  const handleNavigation = (viewName) => {
    setCurrentView(viewName);
  };

  const renderContent = () => {
    // Handle special views for residents
    if (currentUser.role === 'ROLE_RESIDENT') {
      switch (currentView) {
        case 'billing-payments':
          return <BillingPayments user={currentUser} />;
        case 'my-bills':
          return <MyBills user={currentUser} />;
        case 'dashboard':
        default:
          return <ResidentDashboard user={currentUser} />;
      }
    }
    
    // For admin and staff, always show their dashboard
    switch (currentUser.role) {
      case 'ROLE_ADMIN':
        return <AdminDashboard user={currentUser} />;
      case 'ROLE_STAFF':
        return <StaffDashboard user={currentUser} />;
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
          <Sidebar user={currentUser} onNavigate={handleNavigation} currentView={currentView} />
          <div className="content-wrapper">
            <main className="main-content">
              {renderContent()}
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;