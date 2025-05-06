'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] sm:h-screen overflow-hidden bg-gray-900 text-white font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero.jpg"
          alt="Discover the beauty of India"
          fill
          priority
          quality={85}
          className="object-cover object-center z-0 opacity-70"
          sizes="100vw"
          style={{ objectPosition: 'center 20%' }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 z-10"></div>

      {/* Top Icons */}
      <div className="absolute top-8 w-full flex justify-center items-center gap-8 z-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg p-3 rounded-full border border-white/30 shadow-2xl hover:scale-110 transition-transform"
        >
          <Image
            src="/icons/icon1.jpeg"
            alt="Icon 1"
            width={50}
            height={50}
            className="rounded-full animate-pulse"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg p-3 rounded-full border border-white/30 shadow-2xl hover:scale-110 transition-transform"
        >
          <Image
            src="/icons/icon2.jpeg"
            alt="Icon 2"
            width={50}
            height={50}
            className="rounded-full animate-pulse"
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
            className="text-[2.6rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4rem] font-extrabold leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Explore the World with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-gray-600 to-yellow-500">
              Shubham Tours
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 font-medium"
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
              className="px-6 py-3 text-sm sm:text-base bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              View Packages
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 text-sm sm:text-base border-2 border-white text-white rounded-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 mt-3 sm:mt-0"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
