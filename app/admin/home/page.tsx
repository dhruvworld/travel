'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { getHomeContent } from "../../lib/services/firebase-home";

// Use dynamic imports with loading fallbacks for better performance
const FeaturedPackagesTab = dynamic(
  () => import('./FeaturedPackagesTab'),
  { 
    loading: () => (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading packages manager...</span>
      </div>
    ),
    ssr: false
  }
);

const TestimonialsTab = dynamic(
  () => import('./TestimonialsTab'),
  { 
    loading: () => (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading testimonials manager...</span>
      </div>
    ),
    ssr: false
  }
);

const GalleryEditor = dynamic(
  () => import('./gallery'),
  { 
    loading: () => (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading gallery manager...</span>
      </div>
    ),
    ssr: false
  }
);

const OffersEditor = dynamic(
  () => import('./offers'),
  { 
    loading: () => (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading offers manager...</span>
      </div>
    ),
    ssr: false
  }
);

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<'packages' | 'testimonials' | 'gallery' | 'offers'>('packages');

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-blue-700">🏠 Homepage Content Manager</h1>

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

      {/* Only render the active tab component */}
      <div className="border rounded-xl p-4 bg-white shadow">
        {activeTab === 'packages' && (
          <>
            <h2 className="text-lg font-semibold mb-4">📦 Featured Packages</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <FeaturedPackagesTab />
            </Suspense>
          </>
        )}

        {activeTab === 'testimonials' && (
          <>
            <h2 className="text-lg font-semibold mb-4">💬 Client Testimonials</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <TestimonialsTab />
            </Suspense>
          </>
        )}

        {activeTab === 'gallery' && (
          <>
            <h2 className="text-lg font-semibold mb-4">🖼️ Travel Gallery</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <GalleryEditor />
            </Suspense>
          </>
        )}

        {activeTab === 'offers' && (
          <>
            <h2 className="text-lg font-semibold mb-4">🏷️ Special Offers</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <OffersEditor />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}
