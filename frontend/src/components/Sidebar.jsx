// File: frontend/src/components/Sidebar.jsx
import React from 'react';

function Sidebar() {
  // In a real app, these would be links. For now, they are placeholders.
  const navItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Reports', icon: '📊' },
    { name: 'Users', icon: '👥' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>WMS</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className={item.name === 'Dashboard' ? 'active' : ''}>
              <a href="#">
                <span className="icon">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;