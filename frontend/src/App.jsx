// File: frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './App.css'; // Basic styling

function App() {
  // useState will hold our list of users. It starts as an empty array.
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect will run once when the component loads
  useEffect(() => {
    // Define an async function to fetch data
    const fetchUsers = async () => {
      try {
        // Make a GET request to our backend endpoint
        const response = await axios.get('http://localhost:8080/api/auth/users');
        setUsers(response.data); // Store the fetched users in state
      } catch (err) {
        setError('Failed to fetch users. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false whether it succeeded or failed
      }
    };

    fetchUsers(); // Call the function
  }, []); // The empty array [] means this effect runs only once

  // Display a loading message
  if (loading) {
    return <div>Loading users...</div>;
  }

  // Display an error message
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // Display the user data in a table
  return (
    <div className="App">
      <h1>Smart Waste Management - Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;