'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FeaturedPackagesForm } from './FeaturedPackagesForm';

interface Package {
  id: string;
  name: string;
  featured?: boolean;
  isActive?: boolean;
}

export default function TopDestinationsPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch('/api/packages');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="p-6">Loading packages...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Featured Destinations</h1>
      <p className="mb-6 text-gray-600">
        Select packages to be featured on the homepage. Featured packages will be displayed prominently to visitors.
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <FeaturedPackagesForm packages={packages} />
      </div>
    </div>
  );
}
