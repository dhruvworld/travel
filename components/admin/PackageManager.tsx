'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Package {
  id: string;
  name: string;
  isFeatured: boolean;
}

export default function PackageManager() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Failed to load packages.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleToggleFeatured = async (id: string, isFeatured: boolean) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/featured-packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
        },
        body: JSON.stringify({ id, featured: !isFeatured }),
      });
      if (!response.ok) throw new Error('Failed to update featured status');
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg.id === id ? { ...pkg, isFeatured: !isFeatured } : pkg
        )
      );
      toast.success('Package updated successfully.');
    } catch (error) {
      console.error('Error updating package:', error);
      toast.error('Failed to update package.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading packages...</div>;
  }

  return (
    <div>
      <h1>Manage Packages</h1>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.id}>
            <span>{pkg.name}</span>
            <button
              onClick={() => handleToggleFeatured(pkg.id, pkg.isFeatured)}
              disabled={isSaving}
            >
              {pkg.isFeatured ? 'Unfeature' : 'Feature'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
