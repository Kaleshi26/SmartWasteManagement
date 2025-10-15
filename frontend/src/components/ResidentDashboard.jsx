// File: frontend/src/components/ResidentDashboard.jsx
import React from 'react';

function ResidentDashboard({ user }) {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Resident Dashboard</h2>
      <p className="dashboard-welcome">Welcome, {user.name}!</p>
      <div className="dashboard-card">
        <h3>Your Features:</h3>
        <ul>
          <li>View and Pay Invoices (Use Cases 1 & 4)</li>
          <li>Schedule Special Collections</li>
          <li>View Collection History</li>
        </ul>
      </div>
    </div>
  );
}

export default ResidentDashboard;