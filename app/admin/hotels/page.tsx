'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Hotel {
  id: string;
  name: string;
}

export default function HotelsPage() {
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    // Fetch hotel data here Book Now
    setHotel({ id: 'default', name: 'Sample Hotel' });
  }, []);

  if (!hotel) return <div>Loading...</div>;

  return (    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hotels</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-xl font-bold">Reach Out for Details</span>
        <Link 
          href={`/hotels/${hotel.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
