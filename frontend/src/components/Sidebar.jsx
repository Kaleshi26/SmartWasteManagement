// File: frontend/src/components/Sidebar.jsx
import React from 'react';

function Sidebar({ user, onNavigate, currentView }) {
  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { name: 'Dashboard', icon: '🏠', view: 'dashboard' },
      { name: 'Users', icon: '👥', view: 'users' },
      { name: 'Settings', icon: '⚙️', view: 'settings' },
    ];

    // Add billing-related items only for residents
    if (user && user.role === 'ROLE_RESIDENT') {
      return [
        { name: 'Dashboard', icon: '🏠', view: 'dashboard' },
        { name: 'Billing & Payments', icon: '💳', view: 'billing-payments' },
        { name: 'My Bills', icon: '📄', view: 'my-bills' },
        { name: 'Users', icon: '👥', view: 'users' },
        { name: 'Settings', icon: '⚙️', view: 'settings' },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const handleNavClick = (view) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>WMS</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className={currentView === item.view ? 'active' : ''}>
              <button 
                onClick={() => handleNavClick(item.view)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  width: '100%', 
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '10px',
                  color: 'inherit'
                }}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;