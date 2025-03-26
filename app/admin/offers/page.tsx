'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Offer {
  id: string;
  name: string;
  discount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    discount: '',
    startDate: '',
    endDate: '',
    isActive: true
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      setOffers([
        { id: '1', name: 'Summer Special', discount: 15, startDate: '2024-05-01', endDate: '2024-06-30', isActive: true },
        { id: '2', name: 'Early Bird', discount: 10, startDate: '2024-04-01', endDate: '2024-04-30', isActive: true },
        { id: '3', name: 'Monsoon Madness', discount: 20, startDate: '2024-07-01', endDate: '2024-08-31', isActive: false },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddClick = () => {
    setModalMode('add');
    setCurrentOffer(null);
    setFormData({
      name: '',
      discount: '',
      startDate: '',
      endDate: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleEditClick = (offer: Offer) => {
    setModalMode('edit');
    setCurrentOffer(offer);
    setFormData({
      name: offer.name,
      discount: offer.discount.toString(),
      startDate: offer.startDate,
      endDate: offer.endDate,
      isActive: offer.isActive
    });
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      // TODO: Replace with actual API call
      setOffers(offers.filter(offer => offer.id !== id));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual API call
    if (modalMode === 'add') {
      const newOffer: Offer = {
        id: Date.now().toString(),
        name: formData.name,
        discount: parseFloat(formData.discount),
        startDate: formData.startDate,
        endDate: formData.endDate,
        isActive: formData.isActive
      };
      setOffers([...offers, newOffer]);
    } else if (modalMode === 'edit' && currentOffer) {
      const updatedOffers = offers.map(offer => 
        offer.id === currentOffer.id 
          ? { 
              ...offer, 
              name: formData.name,
              discount: parseFloat(formData.discount),
              startDate: formData.startDate,
              endDate: formData.endDate,
              isActive: formData.isActive
            } 
          : offer
      );
      setOffers(updatedOffers);
    }
    
    setShowModal(false);
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
        <h2 className="text-2xl font-bold">Special Offers</h2>
        <button 
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create New Offer
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer) => (
              <motion.tr
                key={offer.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{offer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{offer.discount}%</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(offer.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(offer.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    offer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {offer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEditClick(offer)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(offer.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === 'add' ? 'Create New Offer' : 'Edit Offer'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {modalMode === 'add' ? 'Create Offer' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 