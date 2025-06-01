'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Loading Placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      {/* Background Image */}
      <Image
        src="/images/hero-bg.svg"
        alt="Beautiful travel destination"
        fill
        priority
        quality={isMobile ? 75 : 90}
        sizes="100vw"
        className={`object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-70' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Discover Your Dream Destination
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl"
          >
            Experience unforgettable journeys with our curated travel packages
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/packages"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium"
              aria-label="Explore our travel packages"
            >
              Explore Packages
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg font-medium"
              aria-label="Contact us for more information"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
