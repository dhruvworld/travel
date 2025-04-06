'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  description: string;
}

const tours: Tour[] = [
  {
    id: 1,
    title: "Golden Triangle Tour",
    location: "Delhi - Agra - Jaipur",
    duration: "6 Days",
    price: 35000,
    image: "/images/golden-triangle.jpg",
    description: "Experience the rich history and culture of India's most iconic cities.",
  },
  {
    id: 2,
    title: "Kerala Backwaters",
    location: "Kerala",
    duration: "5 Days",
    price: 28000,
    image: "/images/kerala.jpg",
    description: "Explore the serene backwaters and lush landscapes of God's own country.",
  },
  {
    id: 3,
    title: "Rajasthan Heritage",
    location: "Rajasthan",
    duration: "8 Days",
    price: 45000,
    image: "/images/rajasthan.jpg",
    description: "Discover the royal heritage and desert beauty of Rajasthan.",
  },
];

export default function ToursPage() {
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [priceRange, setPriceRange] = useState(50000);

  const filteredTours = tours.filter(tour => {
    const durationMatch = selectedDuration === 'all' || 
      (selectedDuration === 'short' && parseInt(tour.duration) <= 5) ||
      (selectedDuration === 'long' && parseInt(tour.duration) > 5);
    const priceMatch = tour.price <= priceRange;
    return durationMatch && priceMatch;
  });

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

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Durations</option>
                <option value="short">5 Days or Less</option>
                <option value="long">More than 5 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price (₹{priceRange})
              </label>
              <input
                type="range"
                min="10000"
                max="50000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{tour.location}</span>
                  <span>{tour.duration}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold">₹{tour.price}</span>
                  <Link 
                    href={`/tours/${tour.id}`} 
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
    </div>
  );
}