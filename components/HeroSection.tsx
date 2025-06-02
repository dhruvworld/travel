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
      {!imageLoaded && (        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
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
    </section>
  );
}

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Loading Placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="Beautiful travel destination"
        fill
        priority
        quality={isMobile ? 75 : 90}
        sizes="100vw"
        className={`object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-70' : 'opacity-0'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ 
            objectPosition: 'center 20%',
            transform: 'scale(1.1)',
            transition: 'transform 0.3s ease-in-out'
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>

      {/* Top Icons */}
      <div className="absolute top-4 sm:top-8 w-full flex justify-center items-center gap-4 sm:gap-8 z-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg p-2 sm:p-3 rounded-full border border-white/30 shadow-2xl hover:scale-110 transition-transform"
        >
          <Image
            src="/icons/icon1.jpeg"
            alt="Icon 1"
            width={40}
            height={40}
            loading="eager"
            className="rounded-full animate-pulse w-8 h-8 sm:w-12 sm:h-12"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg p-2 sm:p-3 rounded-full border border-white/30 shadow-2xl hover:scale-110 transition-transform"
        >
          <Image
            src="/icons/icon2.jpeg"
            alt="Icon 2"
            width={40}
            height={40}
            loading="eager"
            className="rounded-full animate-pulse w-8 h-8 sm:w-12 sm:h-12"
          />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full container mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Explore the World with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800">
              Shubham Tours
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Personalized tours. Unforgettable memories.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/packages"
              className="px-6 py-3 text-sm sm:text-base bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              View Packages
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 text-sm sm:text-base border-2 border-white text-white rounded-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 mt-3 sm:mt-0 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
