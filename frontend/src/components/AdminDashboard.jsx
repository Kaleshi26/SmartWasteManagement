// File: frontend/src/components/AdminDashboard.jsx
import React from 'react';

function AdminDashboard({ user }) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      <p className="mt-2 text-gray-600">Welcome, {user.name}!</p>
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h3 className="font-semibold text-lg">Your Features:</h3>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>Generate Reports & Analyze Data (Use Case 3)</li>
          <li>Manage Users and Bins</li>
          <li>Configure System Settings</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;