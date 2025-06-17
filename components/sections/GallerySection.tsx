'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  url: string;
}

// Static gallery data
const staticGalleryImages: GalleryImage[] = [
  { id: '1', title: 'Taj Mahal at sunrise', url: '/images/taj-mahal.jpg' },
  { id: '2', title: 'Kerala Backwaters', url: '/images/kerala-backwaters.jpg' },
  { id: '3', title: 'Rajasthan Desert', url: '/images/rajasthan.jpg' },
  { id: '4', title: 'Himalayas', url: '/images/himalayas.jpg' },
  { id: '5', title: 'Goa Beaches', url: '/images/goa.jpg' },
  { id: '6', title: 'Varanasi Ghats', url: '/images/varanasi.jpg' },
];

export default function GallerySection() {
  const [images] = useState<GalleryImage[]>(staticGalleryImages);

  // Only display at most 6 images in the homepage section
  const displayImages = images.slice(0, 6);

  if (displayImages.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
            Gallery
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Explore India Through Our Lens
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beautiful moments captured during our journeys across incredible destinations
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayImages.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-xl overflow-hidden aspect-square group"
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-white text-center px-4">
                  <p className="font-semibold">{image.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
          >
            View Full Gallery 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
