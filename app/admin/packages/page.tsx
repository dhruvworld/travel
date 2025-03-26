'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  location: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    location: '',
    description: '',
    image: '',
    isActive: true,
  });

  useEffect(() => {
    // Simulated API call
    const fetchPackages = async () => {
      try {
        // TODO: Replace with actual API call
        const mockPackages: Package[] = [
          {
            id: '1',
            name: 'Taj Mahal Tour',
            price: 2999,
            duration: '3 Days',
            location: 'Agra',
            description: 'Experience the wonder of the Taj Mahal',
            image: '/images/taj-mahal.svg',
            isActive: true,
          },
          {
            id: '2',
            name: 'Jaipur Palace Tour',
            price: 3999,
            duration: '4 Days',
            location: 'Jaipur',
            description: 'Explore the royal heritage of Jaipur',
            image: '/images/jaipur.svg',
            isActive: true,
          },
          {
            id: '3',
            name: 'Kerala Backwaters',
            price: 4999,
            duration: '5 Days',
            location: 'Kerala',
            description: 'Cruise through the serene backwaters',
            image: '/images/kerala.svg',
            isActive: true,
          },
        ];
        setPackages(mockPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleAddClick = () => {
    setModalMode('add');
    setCurrentPackage(null);
    setFormData({
      name: '',
      price: '',
      duration: '',
      location: '',
      description: '',
      image: '',
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEditClick = (pkg: Package) => {
    setModalMode('edit');
    setCurrentPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price.toString(),
      duration: pkg.duration,
      location: pkg.location,
      description: pkg.description,
      image: pkg.image,
      isActive: pkg.isActive,
    });
    setShowModal(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        // TODO: Replace with actual API call
        setPackages(packages.filter(pkg => pkg.id !== id));
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        // TODO: Replace with actual API call
        const newPackage: Package = {
          id: Date.now().toString(),
          name: formData.name,
          price: parseFloat(formData.price),
          duration: formData.duration,
          location: formData.location,
          description: formData.description,
          image: formData.image,
          isActive: formData.isActive,
        };
        setPackages([...packages, newPackage]);
      } else {
        // TODO: Replace with actual API call
        setPackages(
          packages.map(pkg =>
            pkg.id === currentPackage?.id
              ? {
                  ...pkg,
                  name: formData.name,
                  price: parseFloat(formData.price),
                  duration: formData.duration,
                  location: formData.location,
                  description: formData.description,
                  image: formData.image,
                  isActive: formData.isActive,
                }
              : pkg
          )
        );
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving package:', error);
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tour Packages</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Package
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={pkg.image}
                        alt={pkg.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                      <div className="text-sm text-gray-500">{pkg.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{pkg.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{pkg.duration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{pkg.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pkg.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {pkg.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditClick(pkg)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(pkg.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {modalMode === 'add' ? 'Add New Package' : 'Edit Package'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Active</label>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {modalMode === 'add' ? 'Add Package' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 