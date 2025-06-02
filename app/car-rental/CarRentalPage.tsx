'use client';

import { useState, useEffect } from 'react';
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

const localCars: Car[] = [
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
    seats: 4,
    transmission: "Manual",
    price: 2000,
    image: "/images/dzire.jpg",
    features: ["Air Conditioning", "Power Windows", "Central Locking", "ABS"]
  },
  {
    id: 3,
    name: "Mahindra Thar",
    category: "SUV",
    seats: 4,
    transmission: "Manual",
    price: 3500,
    image: "/images/thar.jpg",
    features: ["4x4 Drive", "Air Conditioning", "Touchscreen", "Cruise Control"]
  },
  {
    id: 4,
    name: "53 Seat Volvo Bus",
    category: "Bus",
    seats: 53,
    transmission: "Manual",
    price: 18000,
    image: "/images/53 seat volvo/1.jpeg",
    features: ["Luxury AC Coach", "Large Luggage", "Pushback Seats", "Mic & Speaker"]
  },
  {
    id: 5,
    name: "45 Seat Bus",
    category: "Bus",
    seats: 45,
    transmission: "Manual",
    price: 15000,
    image: "/images/45 seat bus/1.jpeg",
    features: ["Comfort Seating", "AC", "Spacious Interior", "Ideal for Groups"]
  },
  {
    id: 6,
    name: "Urbania (20 Seater)",
    category: "Van",
    seats: 20,
    transmission: "Manual",
    price: 9500,
    image: "/images/Urbania 20 seat/1.jpeg",
    features: ["Premium Interior", "Recliner Seats", "USB Charging", "Mood Lighting"]
  },
  {
    id: 7,
    name: "Tempo Traveller (12/17/20 Seater)",
    category: "Van",
    seats: 20,
    transmission: "Manual",
    price: 8500,
    image: "/images/tempo traveller  12 ,17,20 seat/1.jpeg",
    features: ["Family Friendly", "Air Conditioning", "Luggage Space", "Comfort Seats"]
  }
];

export default function CarRentalPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');

  const filteredCars = localCars.filter(car => {
    const categoryMatch = selectedCategory === 'all' || car.category.toLowerCase() === selectedCategory;
    const transmissionMatch = selectedTransmission === 'all' || car.transmission.toLowerCase() === selectedTransmission;
    return categoryMatch && transmissionMatch;
  });

  useEffect(() => {
    console.log('🚗 Filtered Cars:', filteredCars);
  }, [filteredCars]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-blue-600 mb-8 py-8">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-xl font-semibold">Choose from our wide range of vehicles</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 rounded-md shadow mb-8 max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Search by city"
          className="border rounded px-3 py-2 text-sm"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="all">All Categories</option>
          <option value="suv">SUV</option>
          <option value="sedan">Sedan</option>
          <option value="bus">Bus</option>
          <option value="van">Van</option>
        </select>
        <select
          value={selectedTransmission}
          onChange={(e) => setSelectedTransmission(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="all">All Transmissions</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-12">
        {filteredCars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative w-full h-48">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
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
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xl font-bold">Reach Out for Details</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


