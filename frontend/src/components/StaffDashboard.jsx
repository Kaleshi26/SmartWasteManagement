// File: frontend/src/components/StaffDashboard.jsx
import React, { useState } from 'react';
import axios from 'axios';

function StaffDashboard({ user }) {
  // State for the form inputs
  const [binId, setBinId] = useState('');
  const [weightInKg, setWeightInKg] = useState('');

  // State for handling messages
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const collectionData = {
      binId: binId,
      staffId: user.id, // Use the logged-in staff member's ID
      weightInKg: parseFloat(weightInKg), // Convert weight to a number
    };

    try {
      // Send the POST request to the backend endpoint we created earlier
      const response = await axios.post('http://localhost:8083/api/waste/collect', collectionData);
      setSuccessMessage(`Successfully recorded collection for Bin ID: ${response.data.wasteBin.binId}`);
      // Clear the form on success
      setBinId('');
      setWeightInKg('');
    } catch (err) {
      setError(err.response?.data || 'Failed to record collection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Record Waste Collection</h2>
      <p className="dashboard-welcome">Enter the Bin ID and weight to record a new collection.</p>

      <div className="dashboard-card">
        {/* We use the 'login-form' class here to reuse existing styles */}
        <form onSubmit={handleSubmit} className="login-form" style={{ maxWidth: 'none', boxShadow: 'none', padding: 0 }}>
          <div className="form-group">
            <label htmlFor="binId">Bin ID (e.g., BIN-101-OG47)</label>
            <input
              type="text"
              id="binId"
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              placeholder="Scan or enter Bin ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (in Kg)</label>
            <input
              type="number"
              id="weight"
              value={weightInKg}
              onChange={(e) => setWeightInKg(e.target.value)}
              placeholder="Enter waste weight"
              step="0.1" // Allows decimal values
              required
            />
          </div>

          {/* We reuse the message styles from the login/signup forms */}
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Recording...' : 'Confirm Collection'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StaffDashboard;