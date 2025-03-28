'use client';

import { useRouter, usePathname } from 'next/navigation';
import './AdminPage.css';

export default function AdminPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <nav className="admin-nav">
          <button 
            className={`nav-button ${pathname === '/admin/destinations' ? 'active' : ''}`}
            onClick={() => router.push('/admin/destinations')}
          >
            <span>📍</span> Manage Destinations
          </button>
          <button 
            className={`nav-button ${pathname === '/admin/bookings' ? 'active' : ''}`}
            onClick={() => router.push('/admin/bookings')}
          >
            <span>📅</span> Manage Bookings
          </button>
          <button 
            className={`nav-button ${pathname === '/admin/users' ? 'active' : ''}`}
            onClick={() => router.push('/admin/users')}
          >
            <span>👥</span> Manage Users
          </button>
          <button 
            className={`nav-button ${pathname === '/admin/settings' ? 'active' : ''}`}
            onClick={() => router.push('/admin/settings')}
          >
            <span>⚙️</span> Settings
          </button>
        </nav>
      </div>
      <div className="admin-content">
        <div className="content-header">
          <h2>Welcome to Admin Dashboard</h2>
        </div>
        <div className="main-content">
          <div className="admin-stats">
            <div className="stat-card">
              <h3>Total Bookings</h3>
              <p>0</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}