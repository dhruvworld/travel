'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";

interface Car {
  id: number;
  name: string;
  category: string;
  seats: number;
  transmission: string;
  price: number;
  folder: string;
  imageCount: number;
  imageExtension: string;
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
    folder: "innova",
    imageCount: 3,
    imageExtension: "jpg",
    features: ["Air Conditioning", "GPS Navigation", "Bluetooth", "Parking Sensors"]
  },
  {
    id: 2,
    name: "Swift Dzire",
    category: "Sedan",
    seats: 5,
    transmission: "Manual",
    price: 2000,
    folder: "dzire",
    imageCount: 2,
    imageExtension: "jpg",
    features: ["Air Conditioning", "Power Windows", "Central Locking", "ABS"]
  },
  {
    id: 3,
    name: "Mahindra Thar",
    category: "SUV",
    seats: 4,
    transmission: "Manual",
    price: 3500,
    folder: "thar",
    imageCount: 2,
    imageExtension: "jpg",
    features: ["4x4 Drive", "Air Conditioning", "Touchscreen", "Cruise Control"]
  },
  {
    id: 4,
    name: "53 Seat Volvo Bus",
    category: "Bus",
    seats: 53,
    transmission: "Manual",
    price: 18000,
    folder: "53-seat-volvo",
    imageCount: 7,
    imageExtension: "jpeg",
    features: ["Luxury AC Coach", "Large Luggage", "Pushback Seats", "Mic & Speaker"]
  },
  {
    id: 5,
    name: "45 Seat Bus",
    category: "Bus",
    seats: 45,
    transmission: "Manual",
    price: 15000,
    folder: "45-seat-bus",
    imageCount: 3,
    imageExtension: "jpeg",
    features: ["Comfort Seating", "AC", "Spacious Interior", "Ideal for Groups"]
  },
  {
    id: 6,
    name: "Urbania (20 Seater)",
    category: "Van",
    seats: 20,
    transmission: "Manual",
    price: 9500,
    folder: "urbania",
    imageCount: 7,
    imageExtension: "jpeg",
    features: ["Premium Interior", "Recliner Seats", "USB Charging", "Mood Lighting"]
  },
  {
    id: 7,
    name: "Tempo Traveller (12/17/20 Seater)",
    category: "Van",
    seats: 20,
    transmission: "Manual",
    price: 8500,
    folder: "tempo-traveller",
    imageCount: 9,
    imageExtension: "jpeg",
    features: ["Family Friendly", "Air Conditioning", "Luggage Space", "Comfort Seats"]
  }
];

export default function CarRentalClientComponent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-blue-600 mb-8 py-8">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Car Rental</h1>
            <p className="text-xl">Choose from our wide range of vehicles</p>
          </div>
        </div>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-12">
        {cars.map((car) => {
          const extension = car.imageExtension;
          const folderPath = encodeURI(`/images/cars/${car.folder}`);
          const images = Array.from({ length: car.imageCount }, (_, i) => `${folderPath}/${i + 1}.${extension}`);

          return (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="flex overflow-x-auto gap-2 w-full p-2">
                {images.map((src, idx) => (
                  <div key={idx} className="relative flex-shrink-0 w-[300px] h-[180px]">
                    <Image
                      src={src}
                      alt={`${car.name} image ${idx + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Reach Out for Details</span>
                  <Link href="/book-now">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
