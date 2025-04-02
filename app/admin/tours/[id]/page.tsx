'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ClientFileUploader from '../../components/ClientFileUploader';

// Make sure the entire page is a client component to handle the event properly
export default function EditTourPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchTourData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/tours/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tour data');
        }
        const data = await response.json();
        setFormData({
          name: data.name || '',
          description: data.description || '',
          image: data.image || '',
        });
      } catch (error) {
        console.error('Error fetching tour data:', error);
        toast.error('Failed to fetch tour data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTourData();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpdate = (fieldName: string, imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: imageUrl,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/tours/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update tour');
      }

      toast.success('Tour updated successfully');
      router.push('/admin/tours');
    } catch (error) {
      console.error('Error updating tour:', error);
      toast.error('Failed to update tour');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Tour</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Tour Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <ClientFileUploader
              fieldName="image"
              onImageUpdate={handleImageUpdate}
              label="Tour Image"
              initialImage={formData.image}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}