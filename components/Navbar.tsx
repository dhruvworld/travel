'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/packages' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Car Rental', href: '/car-rental' },
    { name: 'Custom Tours', href: '/custom-tours' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-10"
            aria-label="Shubham Tours Home"
          >
            <Image
              src="/images/logo.png"
              alt="Shubham Tours Logo"
              width={150}
              height={50}
              className="h-8 sm:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/book-now"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              aria-label="Book Now"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current mt-1.5 transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current mt-1.5 transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-0 left-0 right-0 bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-blue-600 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/book-now"
                  className="px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Book Now"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
