'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Packages', href: '/packages', icon: '🎒' },
  { name: 'Hotels', href: '/hotels', icon: '🏨' },
  { name: 'Car Rental', href: '/car-rental', icon: '🚗' },
  { name: 'Custom Tours', href: '/custom-tours', icon: '✈️' },
  { name: 'Contact', href: '/contact', icon: '📞' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute bottom-20 right-0 w-72 h-72"
          >
            <div className="relative w-full h-full">
              {navItems.map((item, index) => {
                const angle = (index * 360) / navItems.length;
                const radius = 120; // Increased radius for better spacing
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: x,
                      y: y,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl hover:bg-blue-50 transition-colors group"
                    >
                      <span className="text-2xl transform group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="text-xs mt-1 font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-7 h-7 flex flex-col justify-center items-center"
        >
          <span className="w-7 h-0.5 bg-white mb-1.5 rounded-full"></span>
          <span className="w-7 h-0.5 bg-white rounded-full"></span>
        </motion.div>
      </motion.button>
    </div>
  );
} 