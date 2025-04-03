'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function GallerySection() {
  // Using the images from your public directory that already exist
  const galleryImages = [
    {
      src: "/images/taj-mahal.jpg",
      alt: "Taj Mahal in Agra at sunrise",
      caption: "Taj Mahal, Agra"
    },
    {
      src: "/images/kerala-backwaters.jpg",
      alt: "Serene backwaters of Kerala with houseboats",
      caption: "Backwaters, Kerala"
    },
    {
      src: "/images/rajasthan.jpg",
      alt: "Golden sand dunes of Rajasthan desert",
      caption: "Thar Desert, Rajasthan"
    },
    {
      src: "/images/himalayas.jpg",
      alt: "Snow-capped mountains in Manali",
      caption: "Mountains, Himalayas"
    },
    {
      src: "/images/goa.jpg",
      alt: "Palm-lined beaches of Goa",
      caption: "Beaches, Goa"
    },
    {
      src: "/images/varanasi.jpg",
      alt: "Evening aarti ceremony at Varanasi ghats",
      caption: "Ghats, Varanasi"
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-6 bg-gray-100" id="gallery">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Travel Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Glimpses from breathtaking journeys across India
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((image, idx) => (
            <motion.div 
              key={idx} 
              className="relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-md group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 font-medium">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
