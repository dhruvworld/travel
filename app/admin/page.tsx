'use client';

export const dynamic = 'force-dynamic';

import { useRouter, usePathname } from 'next/navigation';
import './AdminPage.css';

// Define menu items outside component to avoid recreating on each render
const MENU_ITEMS = [
  { path: '/admin/destinations', label: 'Manage Destinations', icon: '📍' },
  { path: '/admin/bookings', label: 'Manage Bookings', icon: '📅' },
  { path: '/admin/users', label: 'Manage Users', icon: '👥' },
  { path: '/admin/settings', label: 'Settings', icon: '⚙️' }
] as const;

export default function AdminPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <nav className="admin-nav">
          {MENU_ITEMS.map(({ path, label, icon }) => (
            <button 
              key={path}
              className={`nav-button ${pathname === path ? 'active' : ''}`}
              onClick={() => router.push(path)}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
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