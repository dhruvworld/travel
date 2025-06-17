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
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-800 py-12 text-center text-white mb-8">
        <h1 className="text-4xl font-bold">Luxury Hotels</h1>
        <p className="mt-2 text-lg">Find the perfect stay for your journey</p>
      </div>

      {/* Hotel Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
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
