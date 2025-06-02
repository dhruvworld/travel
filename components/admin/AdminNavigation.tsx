'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export default function AdminNavigation() {
  const pathname = usePathname();
  
  const adminLinks: NavLink[] = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/bookings', label: 'Bookings' },
    { href: '/admin/packages', label: 'Packages' },
    { href: '/admin/top-destinations', label: 'Featured Packages' },
    { href: '/admin/gallery', label: 'Gallery' },
    { href: '/admin/offers', label: 'Offers' },
    { href: '/admin/photos', label: 'Photos' },
    { href: '/admin/upload', label: 'Upload' },
  ];

  return (
    <nav className="bg-white shadow rounded-lg p-4">
      <ul className="space-y-2">
        {adminLinks.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href}
              className={`flex items-center p-2 rounded-md ${
                pathname === link.href 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.icon && <span className="mr-2">{link.icon}</span>}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
