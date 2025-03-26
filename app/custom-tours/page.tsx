'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Destination {
  id: number;
  name: string;
  state: string;
  image: string;
  description: string;
  activities: string[];
  duration: number;
  pricePerDay: number;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Taj Mahal",
    state: "Uttar Pradesh",
    image: "/images/taj-mahal.jpg",
    description: "One of the seven wonders of the world, symbol of eternal love.",
    activities: ["Guided Tour", "Sunset View", "Photography Session"],
    duration: 1,
    pricePerDay: 5000
  },
  {
    id: 2,
    name: "Jaipur City Palace",
    state: "Rajasthan",
    image: "/images/jaipur-palace.jpg",
    description: "Royal residence with stunning architecture and museums.",
    activities: ["Palace Tour", "Cultural Show", "Shopping"],
    duration: 2,
    pricePerDay: 4000
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    state: "Kerala",
    image: "/images/kerala-backwaters.jpg",
    description: "Serene waterways, houseboats, and lush landscapes.",
    activities: ["Houseboat Stay", "Village Tour", "Ayurvedic Spa"],
    duration: 3,
    pricePerDay: 6000
  }
];

export default function CustomToursPage() {
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([]);
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleDestination = (id: number) => {
    setSelectedDestinations(prev => {
      const newSelection = prev.includes(id)
        ? prev.filter(destId => destId !== id)
        : [...prev, id];
      
      // Calculate total days and price
      const selectedDests = destinations.filter(dest => newSelection.includes(dest.id));
      const days = selectedDests.reduce((sum, dest) => sum + dest.duration, 0);
      const price = selectedDests.reduce((sum, dest) => sum + (dest.duration * dest.pricePerDay), 0);
      
      setTotalDays(days);
      setTotalPrice(price);
      
      return newSelection;
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-blue-600">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Custom Tour Packages</h1>
            <p className="text-xl">Create your perfect Indian adventure</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Instructions */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-semibold mb-2">Select Destinations</h3>
              <p className="text-gray-600">Choose the places you want to visit</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-semibold mb-2">Review Package</h3>
              <p className="text-gray-600">Check duration and total cost</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-semibold mb-2">Book Your Tour</h3>
              <p className="text-gray-600">Confirm and customize details</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destinations Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Select Your Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition
                    ${selectedDestinations.includes(dest.id) ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => toggleDestination(dest.id)}
                >
                  <div className="relative h-48">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{dest.name}</h3>
                    <p className="text-gray-600 mb-3">{dest.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {dest.activities.map((activity, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{dest.state}</span>
                      <span>{dest.duration} day(s)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">Your Package Summary</h2>
              
              {selectedDestinations.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6">
                    {destinations
                      .filter(dest => selectedDestinations.includes(dest.id))
                      .map(dest => (
                        <div key={dest.id} className="flex justify-between items-center">
                          <span>{dest.name}</span>
                          <span>₹{dest.pricePerDay * dest.duration}</span>
                        </div>
                      ))}
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Total Duration:</span>
                      <span>{totalDays} days</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total Price:</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                    Proceed to Book
                  </button>
                </>
              ) : (
                <p className="text-gray-500 text-center">
                  Select destinations to create your package
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 