'use client';

import { useState, useEffect } from 'react';

interface Package {
  id: string;
  name: string;
  isFeatured: boolean;
}

export default function FeaturedPackagesForm() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setMessage({
          text: 'Failed to load packages. Please try again.',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleToggleFeatured = (id: string) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, isFeatured: !pkg.isFeatured } : pkg
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    
    try {
      const featuredIds = packages
        .filter(pkg => pkg.isFeatured)
        .map(pkg => pkg.id);
      
      const response = await fetch('/api/featured-packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featuredIds }),
      });
      
      if (!response.ok) throw new Error('Failed to update featured packages');
      
      setMessage({
        text: 'Featured packages updated successfully!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error saving featured packages:', error);
      setMessage({
        text: 'Failed to update featured packages. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-6">Loading packages...</div>;
  }

  return (
    <div className="featured-packages-form">
      {message && (
        <div className={`p-4 mb-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Select the packages you want to feature on the homepage.
        </p>
      </div>
      
      <div className="space-y-2">
        {packages.map(pkg => (
          <div key={pkg.id} className="flex items-center p-3 border rounded hover:bg-gray-50">
            <input
              type="checkbox"
              id={`pkg-${pkg.id}`}
              checked={pkg.isFeatured}
              onChange={() => handleToggleFeatured(pkg.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={`pkg-${pkg.id}`} className="ml-3 block text-sm font-medium text-gray-700">
              {pkg.name}
            </label>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {isSaving ? 'Saving...' : 'Save Featured Packages'}
        </button>
      </div>
    </div>
  );
}
