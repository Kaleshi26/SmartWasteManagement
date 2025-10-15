// File: frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reports/dashboard-stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load dashboard statistics.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <p className="dashboard-welcome">Overview of the waste management system.</p>

      <div className="stats-grid">
        {loading && <p>Loading stats...</p>}
        {error && <p className="error-message">{error}</p>}
        {stats && (
          <>
            <div className="stat-card">
              <h3 className="stat-title">Total Waste Collected</h3>
              <p className="stat-value">{stats.totalWeightKg.toFixed(2)} Kg</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">Total Collections</h3>
              <p className="stat-value">{stats.totalCollections}</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">Registered Bins</h3>
              <p className="stat-value">{stats.totalBins}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;