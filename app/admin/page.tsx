'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Photo {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  location: string;
  isActive: boolean;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [photos, setPhotos] = useState<Photo[]>([]);
  
  useEffect(() => {
    setPhotos([
      { 
        id: '1', 
        title: 'Taj Mahal Sunset', 
        description: 'Beautiful sunset view of Taj Mahal', 
        imageUrl: '/images/taj-mahal.svg', 
        location: 'Agra', 
        isActive: true 
      },
      { 
        id: '2', 
        title: 'Jaipur Palace', 
        description: 'City Palace architecture', 
        imageUrl: '/images/jaipur.svg', 
        location: 'Jaipur', 
        isActive: true 
      },
      { 
        id: '3', 
        title: 'Kerala Houseboat', 
        description: 'Traditional houseboat on backwaters', 
        imageUrl: '/images/kerala.svg', 
        location: 'Kerala', 
        isActive: true 
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-4">
        {['dashboard', 'packages', 'offers', 'bookings', 'photos'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex-grow p-4">
        {activeTab === 'photos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tour Photos</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Upload New Photo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{photo.location}</p>
                    {photo.description && (
                      <p className="text-gray-500 text-sm mb-4">{photo.description}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        photo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {photo.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <div className="space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 