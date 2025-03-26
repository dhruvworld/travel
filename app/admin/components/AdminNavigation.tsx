'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavigation() {
  const pathname = usePathname();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/packages', label: 'Packages' },
    { path: '/admin/offers', label: 'Offers' },
    { path: '/admin/bookings', label: 'Bookings' },
    { path: '/admin/photos', label: 'Photos' },
    { path: '/admin/settings', label: 'Settings' },
  ];

  return (
    <nav className="mt-4">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`block px-4 py-2 ${
            pathname === item.path
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
} 