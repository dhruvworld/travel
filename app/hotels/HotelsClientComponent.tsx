'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities: string[];
  description: string;
}

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Taj Palace",
    location: "New Delhi",
    rating: 4.8,
    price: 15000,
    image: "/images/taj-palace.jpg",
    amenities: ["Swimming Pool", "Spa", "Restaurant", "Fitness Center", "WiFi"],
    description: "Experience luxury and comfort in the heart of New Delhi."
  },
  {
    id: 2,
    name: "The Oberoi Udaivilas",
    location: "Udaipur",
    rating: 4.9,
    price: 25000,
    image: "/images/udaivilas.jpg",
    amenities: ["Lake View", "Spa", "Fine Dining", "Bar", "Pool"],
    description: "Luxury resort overlooking Lake Pichola with traditional architecture."
  },
  {
    id: 3,
    name: "Leela Palace",
    location: "Bangalore",
    rating: 4.7,
    price: 18000,
    image: "/images/leela.jpg",
    amenities: ["Business Center", "Spa", "Multiple Restaurants", "Pool", "Gym"],
    description: "Modern luxury hotel perfect for business and leisure travelers."
  }
];

export default function HotelsClientComponent() {
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState(30000);
  const [selectedRating, setSelectedRating] = useState(0);

  const filteredHotels = hotels.filter(hotel => {
    const locationMatch = searchLocation === '' || 
      hotel.location.toLowerCase().includes(searchLocation.toLowerCase());
    const priceMatch = hotel.price <= priceRange;
    const ratingMatch = selectedRating === 0 || hotel.rating >= selectedRating;
    return locationMatch && priceMatch && ratingMatch;
  });

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-800 py-12 text-center text-white mb-8">
        <h1 className="text-4xl font-bold">Luxury Hotels</h1>
        <p className="mt-2 text-lg">Find the perfect stay for your journey</p>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search by city"
                className="w-full p-2 border rounded-md"
              />
            </div>
            {/* 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price (₹{priceRange})
              </label>
              <input
                type="range"
                min="5000"
                max="30000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
                className="w-full p-2 border rounded-md"
              >
                <option value={0}>All Ratings</option>
                <option value={3}>3+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hotel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Reach Out for Details</span>
                  {/* <span className="text-gray-600">₹{hotel.price}</span> */}
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
    </div>
  );
}
