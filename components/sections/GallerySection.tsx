'use client';

<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  url: string;
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Fallback to demo data if fetch fails
        setImages([
          { id: '1', title: 'Taj Mahal at sunrise', url: '/images/taj-mahal.jpg' },
          { id: '2', title: 'Kerala Backwaters', url: '/images/kerala-backwaters.jpg' },
          { id: '3', title: 'Rajasthan Desert', url: '/images/rajasthan.jpg' },
          { id: '4', title: 'Himalayas', url: '/images/himalayas.jpg' },
          { id: '5', title: 'Goa Beaches', url: '/images/goa.jpg' },
          { id: '6', title: 'Varanasi Ghats', url: '/images/varanasi.jpg' },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryImages();
  }, []);

  // Only display at most 6 images in the homepage section
  const displayImages = images.slice(0, 6);

  if (displayImages.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
<<<<<<< HEAD
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
=======
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

        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          </div>
        ) : (
          <>
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
          </>
        )}
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
      </div>
    </section>
  );
}
