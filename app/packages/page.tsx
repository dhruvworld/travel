<<<<<<< HEAD
// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

import { getAllPackages } from '@/lib/prisma/packages';
=======
'use client';

import { useState } from 'react';
import Image from 'next/image';
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
import Link from 'next/link';
import ClientImage from '@/app/components/ClientImage';
import type { Metadata } from 'next';
import Script from 'next/script';

<<<<<<< HEAD
export const metadata: Metadata = {
  title: 'Tour Packages – Shubham Travel',
  description: 'Browse our carefully curated tour packages for destinations across India. From cultural tours to adventure packages, find your perfect journey.',
  keywords: ['India tour packages', 'travel packages', 'holiday packages', 'Rajasthan tours', 'Kerala packages', 'Golden Triangle tour'],
  openGraph: {
    title: 'Tour Packages – Shubham Travel',
    description: 'Discover our wide range of travel packages across India and beyond.',
    images: [
      {
        url: '/packages-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'Shubham Travel Packages',
      },
    ],
  },
};

export default async function PackagesPage() {
  // Safely fetch packages with error handling
  let packages = [];
  try {
    packages = await getAllPackages();
  } catch (error) {
    console.error('Error fetching packages:', error);
    // Continue with empty array
  }

  return (
    <>
      <Script id="breadcrumb-structured-data" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://shubhamtravel.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Tour Packages",
                "item": "https://shubhamtravel.in/packages"
              }
            ]
          }
        `}
      </Script>
      <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-center">Our Travel Packages</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-8 sm:mb-16">
          Discover our carefully curated travel experiences across India
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {packages.length > 0 ? (
            packages.map((pkg: any) => (
              <div key={pkg.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-40 sm:h-48 relative">
                  {pkg.image ? (
                    <ClientImage
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover"
                      fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2574&auto=format&fit=crop"
                    />
                  ) : (
                    <div className="h-40 sm:h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-sm sm:text-base text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {pkg.description?.substring(0, 120) || 'Explore this amazing travel package with highlights and key features.'}
                    {pkg.description?.length > 120 ? '...' : ''}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-indigo-600">
                      ₹{pkg.price?.toLocaleString() || 'Contact for price'}
                    </span>
                    <Link
                      href={`/packages/${pkg.slug || pkg.id}`}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white text-sm sm:text-base rounded hover:bg-indigo-700"
                    >
                      View Details
=======
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

export default function ToursPage() {
  return (
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
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
                    </Link>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
            ))
          ) : (
            // Placeholder card layout when no packages are available
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                <div className="h-40 sm:h-48 bg-gray-200"></div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Package Title</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Short description of this amazing travel package with highlights and key features.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-indigo-600">₹XX,XXX</span>
                    <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white text-sm sm:text-base rounded hover:bg-indigo-700 cursor-not-allowed opacity-50">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
=======
            );
          })}
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
        </div>
      </div>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
