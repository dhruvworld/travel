'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ClientImage from '@/app/components/ClientImage';
import type { Metadata } from 'next';
import Script from 'next/script';

interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  folder: string;
  imageCount: number;
  description: string;
}

const tours: Tour[] = [
  {
    id: 1,
    title: 'Kasol Escape',
    location: 'Himachal Pradesh',
    duration: '4 Days',
    folder: 'kasol',
    imageCount: 5,
    description: 'Relax in the serene valleys and enjoy the hippie vibes of Kasol.',
  },
  {
    id: 2,
    title: 'Ladakh Adventure',
    location: 'Ladakh',
    duration: '7 Days',
    folder: 'ladakh',
    imageCount: 5,
    description: 'Explore the cold desert, monasteries, and pristine lakes of Ladakh.',
  },
  {
    id: 3,
    title: 'Manali Snow Trails',
    location: 'Himachal Pradesh',
    duration: '5 Days',
    folder: 'manali',
    imageCount: 5,
    description: 'Enjoy snowfall, adventure sports, and cozy cafes in Manali.',
  },
  {
    id: 4,
    title: 'Shimla Hills',
    location: 'Himachal Pradesh',
    duration: '3 Days',
    folder: 'shimla',
    imageCount: 5,
    description: 'Experience colonial charm, mall road shopping and scenic views in Shimla.',
  },
  {
    id: 5,
    title: 'Spiti Valley Ride',
    location: 'Himachal Pradesh',
    duration: '6 Days',
    folder: 'spiti',
    imageCount: 5,
    description: 'Ride through one of India\'s most breathtaking and remote valleys.',
  },
];

// Structured data for the packages page
const packagesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Tour Packages by Shubham Tours',
  description: 'Best tour packages from Ahmedabad to Ladakh, Manali, Kasol, Shimla, and Spiti Valley. Book with Shubham Tours for the best travel experience.',
  url: 'https://shubhamtours.com/packages',
  numberOfItems: tours.length,
  itemListElement: tours.map((tour, index) => ({
    '@type': 'TouristTrip',
    position: index + 1,
    name: tour.title,
    description: tour.description,
    location: {
      '@type': 'Place',
      name: tour.location
    },
    duration: tour.duration,
    provider: {
      '@type': 'TravelAgency',
      name: 'Shubham Tours',
      url: 'https://shubhamtours.com'
    }
  }))
};

export default function ToursPage() {
  return (
    <>
      <Script
        id="packages-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesStructuredData) }}
      />
      <div className="min-h-screen pt-16 bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[300px] bg-blue-600">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tour Packages</h1>
              <p className="text-xl">Discover the best of India with our curated tours</p>
            </div>
          </div>
        </div>

        {/* Tour Cards */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => {
              const images = Array.from({ length: tour.imageCount }, (_, i) => `/images/package-img/${tour.folder}/${i + 1}.jpeg`);

              return (
                <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Scrollable Image Section */}
                  <div className="flex overflow-x-auto gap-2 w-full p-2">
                    {images.map((src, idx) => (
                      <div key={idx} className="relative flex-shrink-0 w-[300px] h-[180px]">
                        <Image
                          src={src}
                          alt={`${tour.title} ${idx + 1}`}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                    <p className="text-gray-600 mb-4">{tour.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{tour.location}</span>
                      <span>{tour.duration}</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[15px] font-semibold">Reach Out for Details</span>
                      <Link
                        href="/book-now"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-semibold"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
