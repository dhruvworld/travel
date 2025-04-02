'use client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Package {
  id: string;
  name: string;
  isActive: boolean;
  // ...other fields as needed
}

export default function TopDestinationsAdmin() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const response = await fetch('/api/packages');
    const data = await response.json();
    setPackages(data);
    setSelectedIds(data.filter((p: Package) => p.isActive).map((p: Package) => p.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/featured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) throw new Error('Failed to update');
      toast.success('Featured packages updated successfully');
    } catch (error) {
      toast.error('Failed to update featured packages');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Featured Packages</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {packages.map((pkg) => (
            <label key={pkg.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedIds.includes(pkg.id)}
                onChange={() => {
                  const newIds = selectedIds.includes(pkg.id)
                    ? selectedIds.filter(id => id !== pkg.id)
                    : [...selectedIds, pkg.id];
                  if (newIds.length <= 3) {
                    setSelectedIds(newIds);
                  } else {
                    toast.error('Maximum 3 packages can be featured');
                  }
                }}
                className="form-checkbox"
              />
              <span>{pkg.name}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
