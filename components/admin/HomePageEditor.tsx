"use client";

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Use dynamic imports to improve performance
const FeaturedPackagesTab = dynamic(() => import('../admin/FeaturedPackagesEditor'), {
  loading: () => <div className="animate-pulse h-64 w-full bg-gray-100 rounded-lg"></div>
});

const TestimonialsTab = dynamic(() => import('../admin/TestimonialsEditor'), {
  loading: () => <div className="animate-pulse h-64 w-full bg-gray-100 rounded-lg"></div>
});

const GalleryTab = dynamic(() => import('../admin/GalleryEditor'), {
  loading: () => <div className="animate-pulse h-64 w-full bg-gray-100 rounded-lg"></div>
});

const OffersTab = dynamic(() => import('../admin/OffersEditor'), {
  loading: () => <div className="animate-pulse h-64 w-full bg-gray-100 rounded-lg"></div>
});

export default function HomePageEditor() {
  const [activeTab, setActiveTab] = useState<'packages' | 'testimonials' | 'gallery' | 'offers'>('packages');

  return (
    <div className="space-y-6 p-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold">Homepage Content Manager</h1>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-4 py-2 rounded ${activeTab === 'packages' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Featured Packages
        </button>
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-4 py-2 rounded ${activeTab === 'testimonials' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Testimonials
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded ${activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Travel Gallery
        </button>
        <button
          onClick={() => setActiveTab('offers')}
          className={`px-4 py-2 rounded ${activeTab === 'offers' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Special Offers
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'packages' && <FeaturedPackagesTab />}
        {activeTab === 'testimonials' && <TestimonialsTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'offers' && <OffersTab />}
      </div>
    </div>
  );
}
