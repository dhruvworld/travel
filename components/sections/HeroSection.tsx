'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] sm:h-screen overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero.jpg"
          alt="Discover the beauty of India"
          fill
          priority
          quality={85}
          className="object-cover object-center z-0 opacity-70"
          sizes="100vw"
          style={{ objectPosition: 'center 20%' }} // Added to control vertical positioning
        />
      </div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 z-10"></div>
      
      {/* Content Container */}
      <div className="relative z-20 h-full container mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Explore the World with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Shubham Travel</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Personalized tours. Unforgettable memories.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/packages" className="px-6 py-3 text-sm sm:text-base bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              View Tours
            </Link>
            <Link href="/contact" className="px-6 py-3 text-sm sm:text-base border-2 border-white text-white rounded-xl hover:bg-white hover:text-dark transition-all duration-300 transform hover:-translate-y-1 mt-3 sm:mt-0">
              Contact Uss
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator - hidden on small mobile screens */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1.2, 
            ease: "easeOut", 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <div className="w-6 sm:w-8 h-10 sm:h-12 rounded-full border-2 border-white flex justify-center items-start p-1">
            <motion.div
              className="w-1.5 h-3 bg-white rounded-full"
              animate={{ 
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
