'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavigation() {
  const pathname = usePathname();

  const menuItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/tours', label: 'Tours' },
    { path: '/admin/bookings', label: 'Bookings' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/settings', label: 'Settings' },
  ];

  return (
    <nav className="admin-nav">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`nav-button ${pathname === item.path ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}