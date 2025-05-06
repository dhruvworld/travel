'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Packages', href: '/packages' },
  { name: 'Hotels', href: '/hotels' },
  { name: 'Car Rental', href: '/car-rental' },
  { name: 'Custom Tours', href: '/custom-tours' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white shadow-sm z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span className="text-blue-600">Shubham</span>{' '}
          <span className="text-yellow-400">Tours</span>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-6 text-[15px] font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={clsx(
                  'px-3 py-1 rounded hover:text-blue-600 transition duration-200',
                  pathname === item.href && 'bg-blue-600 text-white'
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li>
           
          </li>
        </ul>
      </nav>
    </header>
  );
}
