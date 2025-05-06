'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CarRentalsPage() {
  const [car, setCar] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // Fetch car data here
    setCar({ id: 'default' });
  }, []);

  if (!car) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Car Rentals</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-xl font-bold">Reach Out for Details</span>
        <Link 
          href={`/car-rentals/${car.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
