// File: frontend/src/components/StaffDashboard.jsx
import React, { useState } from 'react';
import axios from 'axios';

function StaffDashboard({ user }) {
    // State to manage which view is shown: 'scan' or 'confirm'
    const [view, setView] = useState('scan');

    // State for the form inputs
    const [inputValue, setInputValue] = useState(''); // For the initial Bin ID input
    const [binDetails, setBinDetails] = useState(null); // To store details after scanning
    const [weight, setWeight] = useState(''); // For the weight input
    const [availableBins, setAvailableBins] = useState([]); // To store available bins

    // State for handling loading, errors, and success messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch available bins on component mount
    React.useEffect(() => {
        fetchAvailableBins();
    }, []);

    // Function to fetch available bins
    const fetchAvailableBins = async () => {
        try {
            const response = await axios.get('http://localhost:8083/api/waste/bins');
            setAvailableBins(response.data);
        } catch (err) {
            console.log('No bins available or error fetching bins:', err.message);
        }
    };

    // --- Step 1: Handle the "Scan" or "Get Bin Details" action ---
    const handleScan = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            // Make a GET request to the new endpoint to fetch bin details
            const response = await axios.get(`http://localhost:8083/api/waste/bin/${inputValue}`);
            setBinDetails(response.data);
            setView('confirm'); // On success, switch to the confirmation view
        } catch (err) {
            setError(err.response?.data || 'Error fetching bin details.');
        } finally {
            setLoading(false);
        }
    };

    // --- Step 2: Handle the final "Confirm Collection" action ---
    const handleConfirm = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const collectionData = {
                binId: binDetails.binId,
                staffId: user.id,
                weightInKg: parseFloat(weight),
            };
            // Make the POST request to the existing collection endpoint
            await axios.post('http://localhost:8083/api/waste/collect', collectionData);
            setSuccess(`Collection for bin ${binDetails.binId} recorded successfully!`);
            handleCancel(); // Reset the form back to the scan view
        } catch (err) {
            setError(err.response?.data || 'Failed to record collection.');
        } finally {
            setLoading(false);
        }
    };

    // Function to reset the entire process and go back to the scan view
    const handleCancel = () => {
        setView('scan');
        setInputValue('');
        setBinDetails(null);
        setWeight('');
        setError(null);
        // We don't clear the success message so the user can see the confirmation
    };

    // --- RENDER THE "SCAN" VIEW ---
    if (view === 'scan') {
        return (
            <div className="dashboard-container">
                <h2 className="dashboard-title">Scan Waste Bin</h2>
                <div className="dashboard-card">
                    <form onSubmit={handleScan} className="login-form" style={{ boxShadow: 'none', padding: 0 }}>
                        {success && <p className="success-message">{success}</p>}
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label htmlFor="binId">Enter Bin ID</label>
                            <input
                                id="binId"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="e.g., BIN#15889"
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Searching...' : 'Get Bin Details'}
                        </button>
                    </form>
                    
                    {/* Show available bins if any */}
                    {availableBins.length > 0 && (
                        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>Available Bins:</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {availableBins.map((bin) => (
                                    <button
                                        key={bin.id}
                                        type="button"
                                        onClick={() => setInputValue(bin.binId)}
                                        style={{
                                            padding: '8px 12px',
                                            backgroundColor: '#e9ecef',
                                            border: '1px solid #ced4da',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            color: '#495057'
                                        }}
                                    >
                                        {bin.binId}
                                    </button>
                                ))}
                            </div>
                            <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#6c757d' }}>
                                Click on a bin ID to use it, or enter manually.
                            </p>
                        </div>
                    )}
                    
                </div>
            </div>
        );
    }

    // --- RENDER THE "CONFIRM" VIEW ---
    if (view === 'confirm') {
        return (
            <div className="dashboard-container">
                <h2 className="dashboard-title">Confirm Collection</h2>
                <div className="dashboard-card">
                    <div className="bin-details">
                        <h3>Bin Details</h3>
                        <p><strong>Bin ID:</strong> {binDetails.binId}</p>
                        <p><strong>Address:</strong> {binDetails.address}</p>
                        <p><strong>Resident:</strong> {binDetails.residentName}</p>
                    </div>
                    <form onSubmit={handleConfirm} className="login-form" style={{ boxShadow: 'none', padding: 0, marginTop: '1.5rem' }}>
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label htmlFor="weight">Enter Weight (Kg)</label>
                            <input
                                id="weight"
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                step="0.1"
                                placeholder="e.g., 12.5"
                                required
                            />
                        </div>
                        <div className="button-group">
                            <button type="button" className="cancel-button" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Confirming...' : 'Confirm Collecting'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default StaffDashboard;