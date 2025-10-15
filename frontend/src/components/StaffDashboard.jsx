// File: frontend/src/components/StaffDashboard.jsx
import React from 'react';

function StaffDashboard({ user }) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800">Staff Dashboard</h2>
      <p className="mt-2 text-gray-600">Welcome, {user.name}!</p>
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h3 className="font-semibold text-lg">Your Features:</h3>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>Record Waste Collection (Use Case 2)</li>
          <li>View Assigned Routes</li>
          <li>Report Bin Issues</li>
        </ul>
      </div>
    </div>
  );
}

export default StaffDashboard;