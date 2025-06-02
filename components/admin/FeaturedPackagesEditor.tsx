"use client";

import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

interface Package {
  id: string;
  name: string;
  featured: boolean;
  image?: string;
}

export default function FeaturedPackagesEditor() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        const response = await fetch('/api/packages');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();
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
      const response = await fetch(`/api/admin/packages/${id}/toggle-featured`, {
        method: 'PATCH'
      });
      
      if (!response.ok) throw new Error('Failed to update package');
      
      setPackages(prevPackages => 
        prevPackages.map(pkg => 
          pkg.id === id ? { ...pkg, featured: !pkg.featured } : pkg
        )
      );
      
      toast.success('Package updated successfully');
    } catch (error) {
      console.error('Error updating package:', error);
      toast.error('Failed to update package');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold">Featured Packages Manager</h1>
      
      {packages.length === 0 ? (
        <p className="text-gray-500">No packages found. Create some packages first.</p>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {packages.map(pkg => (
              <li key={pkg.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  {pkg.image && (
                    <div className="w-10 h-10 rounded-md overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="font-medium">{pkg.name}</span>
                </div>
                <button
                  onClick={() => toggleFeatured(pkg.id)}
                  className={`px-3 py-1 rounded ${
                    pkg.featured 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pkg.featured ? 'Featured' : 'Not Featured'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
