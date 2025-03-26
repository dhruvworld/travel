'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Car {
  id: number;
  name: string;
  category: string;
  seats: number;
  transmission: string;
  price: number;
  image: string;
  features: string[];
}

const cars: Car[] = [
  {
    id: 1,
    name: "Toyota Innova Crysta",
    category: "SUV",
    seats: 7,
    transmission: "Automatic",
    price: 3000,
    image: "/images/innova.jpg",
    features: ["Air Conditioning", "GPS Navigation", "Bluetooth", "Parking Sensors"]
  },
  {
    id: 2,
    name: "Swift Dzire",
    category: "Sedan",
    seats: 5,
    transmission: "Manual",
    price: 1500,
    image: "/images/dzire.jpg",
    features: ["Air Conditioning", "Power Windows", "Central Locking", "ABS"]
  },
  {
    id: 3,
    name: "Mahindra Thar",
    category: "SUV",
    seats: 4,
    transmission: "Manual",
    price: 4000,
    image: "/images/thar.jpg",
    features: ["4x4 Drive", "Air Conditioning", "Touchscreen", "Cruise Control"]
  }
];

export default function CarRentalPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');

  const filteredCars = cars.filter(car => {
    const categoryMatch = selectedCategory === 'all' || car.category.toLowerCase() === selectedCategory;
    const transmissionMatch = selectedTransmission === 'all' || 
      car.transmission.toLowerCase() === selectedTransmission;
    return categoryMatch && transmissionMatch;
  });

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-blue-600">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Car Rental Services</h1>
            <p className="text-xl">Choose from our wide range of vehicles</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="hatchback">Hatchback</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transmission
              </label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Types</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Car Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{car.category} • {car.seats} Seats</span>
                  <span>{car.transmission}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold">₹{car.price}/day</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 