import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li onClick={() => navigate('/admin/destinations')}>Manage Destinations</li>
            <li onClick={() => navigate('/admin/bookings')}>Manage Bookings</li>
            <li onClick={() => navigate('/admin/users')}>Manage Users</li>
            <li onClick={() => navigate('/admin/settings')}>Settings</li>
          </ul>
        </nav>
      </div>
      <div className="admin-content">
        <h1>Welcome to Admin Dashboard</h1>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>0</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>0</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>$0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
