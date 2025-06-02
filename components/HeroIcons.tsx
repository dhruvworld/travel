'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroIcons() {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/70 backdrop-blur-md p-2 rounded-xl shadow-md hover:scale-110 transition-transform duration-300"
      >
        <Image src="/icons/icon1.jpeg" alt="Icon 1" width={48} height={48} />
      </motion.div>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white/70 backdrop-blur-md p-2 rounded-xl shadow-md hover:scale-110 transition-transform duration-300"
      >
        <Image src="/icons/icon2.jpeg" alt="Icon 2" width={48} height={48} />
      </motion.div>
    </div>
  );
}
