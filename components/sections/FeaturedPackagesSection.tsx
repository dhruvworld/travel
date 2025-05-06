'use client';

import Image from 'next/image';
import Link from 'next/link';

type Package = {
  id: string;
  name: string;
  image: string;
  price: number;
  duration: string;
  description: string;
  location: string;
};

const featuredPackages: Package[] = [
  {
    id: 'golden-triangle',
    name: 'Golden Triangle Tour',
    image: '/images/golden-triangle.jpg',
    price: 29999,
    duration: '6 Days',
    description: 'Delhi, Agra, and Jaipur in 6 days',
    location: 'North India',
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    image: '/images/kerala.jpg',
    price: 24999,
    duration: '5 Days',
    description: "Explore God's own country",
    location: 'Kerala',
  },
  {
    id: 'varanasi-spiritual',
    name: 'Varanasi Spiritual Tour',
    image: '/images/varanasi.jpg',
    price: 19999,
    duration: '4 Days',
    description: 'Sacred journey along the Ganges',
    location: 'Varanasi',
  },
];

export default function FeaturedPackagesSection() {
  return (
    <section className="py-12 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-14">
          Featured Tour Packages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white text-gray-800 px-2 py-1 text-xs sm:text-sm font-semibold rounded-full shadow">
                  {pkg.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 font-medium">
                    Reach Out for Details
                  </span>
                  <Link
                    href="/book-now"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
