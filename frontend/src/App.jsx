// File: frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'; // <<< Import the new SignupPage
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' or 'signup'

  // Dashboard state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to fetch user data when someone logs in
  useEffect(() => {
    if (currentUser) {
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get('http://localhost:8080/api/auth/users');
          setUsers(response.data);
        } catch (err) {
          setError('Failed to fetch users.');
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [currentUser]);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUsers([]);
    setView('login'); // Go back to login view on logout
  };

  // Function to render the correct view when logged out
  const renderAuthPage = () => {
    if (view === 'login') {
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setView('signup')} />;
    } else {
      return <SignupPage onNavigateToLogin={() => setView('login')} />;
    }
  };

  return (
    <div className="App">
      {!currentUser ? (
        // If logged out, render either the login or signup page
        renderAuthPage()
      ) : (
        // If logged in, show the dashboard
        <div>
          <header className="app-header">
            <h1>WMS Dashboard</h1>
            <div className="user-info">
              <span>Welcome, {currentUser.name}! ({currentUser.role})</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </header>
          <main className="dashboard-content">
            <h2>System Users</h2>
            {loading && <div>Loading...</div>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
              <table>
                {/* User table code remains the same */}
                <thead>
                  <tr>
                    <th>ID</th><th>Name</th><th>Email</th><th>Address</th><th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.address}</td><td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;