"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type TourPackage = {
  id: string;
  name: string;
  featured: boolean;
  image?: string;
};

export default function FeaturedPackagesTab() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        const res = await fetch('/api/packages');
        if (!res.ok) throw new Error('Failed to fetch packages');
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Failed to load packages');
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const toggleFeatured = async (id: string) => {
    try {
      setToggleLoading(id);
      await axios.patch(`/api/admin/packages/${id}/toggle-featured`);
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg.id === id ? { ...pkg, featured: !pkg.featured } : pkg
        )
      );
      toast.success('Package updated successfully');
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast.error('Failed to update package');
    } finally {
      setToggleLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading packages...</span>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed">
        No packages found. Please create some packages first.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 mb-4">
        Toggle which packages should appear in the Featured Packages section on the homepage.
      </p>
      
      {packages.map((pkg) => (
        <div 
          key={pkg.id} 
          className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50 transition"
        >
          <div className="flex items-center">
            {pkg.image && (
              <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
              </div>
            )}
            <span className="font-medium">{pkg.name}</span>
          </div>
          <button
            onClick={() => toggleFeatured(pkg.id)}
            disabled={toggleLoading === pkg.id}
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${
              toggleLoading === pkg.id
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : pkg.featured
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {toggleLoading === pkg.id ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              <>
                {pkg.featured ? '✓ Featured' : 'Add to Featured'}
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
