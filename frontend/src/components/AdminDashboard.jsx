// File: frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]); // <<< State for the collection events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We can fetch both stats and events at the same time
    const fetchData = async () => {
      try {
        // Promise.all lets us run multiple requests in parallel
        const [statsResponse, eventsResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/reports/dashboard-stats'),
          axios.get('http://localhost:8080/api/reports/collection-events')
        ]);
        setStats(statsResponse.data);
        setEvents(eventsResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <p className="dashboard-welcome">Overview of the waste management system.</p>

      {/* --- Stats Grid (Existing Code) --- */}
      <div className="stats-grid">
        {loading && <p>Loading stats...</p>}
        {error && <p className="error-message">{error}</p>}
        {stats && (
          <>
            <div className="stat-card"><h3 className="stat-title">Total Waste Collected</h3><p className="stat-value">{stats.totalWeightKg.toFixed(2)} Kg</p></div>
            <div className="stat-card"><h3 className="stat-title">Total Collections</h3><p className="stat-value">{stats.totalCollections}</p></div>
            <div className="stat-card"><h3 className="stat-title">Registered Bins</h3><p className="stat-value">{stats.totalBins}</p></div>
          </>
        )}
      </div>

      {/* --- START: NEW COLLECTION LOG TABLE --- */}
      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3>Recent Collection Events</h3>
        {loading && <p>Loading events...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Bin ID</th>
                <th>Resident</th>
                <th>Staff Member</th>
                <th>Time</th>
                <th>Weight (Kg)</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.binId}</td>
                    <td>{event.residentName}</td>
                    <td>{event.staffName}</td>
                    {/* Format the date to be more readable */}
                    <td>{new Date(event.collectionTime).toLocaleString()}</td>
                    <td>{event.weightInKg.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No collection events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* --- END: NEW COLLECTION LOG TABLE --- */}

    </div>
  );
}

export default AdminDashboard;