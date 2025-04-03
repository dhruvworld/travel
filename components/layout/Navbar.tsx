'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/destinations', label: 'Destinations' },
  { path: '/packages', label: 'Packages' },
  { path: '/tours', label: 'Tours' },
  { path: '/hotels', label: 'Hotels' },
  { path: '/car-rental', label: 'Car Rental' }, 
  { path: '/custom-tours', label: 'Custom Tours' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar appearance when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              {/* Replace with text logo since image is missing */}
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Shubham Travel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  pathname === item.path
                    ? 'text-white bg-gradient-to-r from-primary to-blue-500'
                    : 'text-dark hover:bg-light'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="/admin" 
              className="ml-2 px-3 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-blue-500 hover:from-blue-600 hover:to-blue-600 transition-all duration-300"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen border-t border-gray-200' : 'max-h-0'
        }`}
      >
        <nav className="px-4 pt-2 pb-4 space-y-1 bg-white">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === item.path
                  ? 'text-white bg-gradient-to-r from-primary to-blue-500'
                  : 'text-dark hover:bg-light'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-primary to-blue-500"
          >
            Admin Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}