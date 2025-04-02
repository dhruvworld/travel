'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ClientImageUploader from '../components/ClientImageUploader';

export default function AdminHomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    welcomeTitle: '',
    welcomeText: '',
  });
  const [previewImage, setPreviewImage] = useState('');
  const [heroImage, setHeroImage] = useState<File | null>(null);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/home');
        if (!response.ok) {
          throw new Error('Failed to fetch home content');
        }
        const data = await response.json();
        
        setFormData({
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          welcomeTitle: data.welcomeTitle || '',
          welcomeText: data.welcomeText || '',
        });
        
        if (data.heroImage) {
          setPreviewImage(data.heroImage);
        }
      } catch (error) {
        console.error('Failed to load home content', error);
        toast.error('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (file: File) => {
    setHeroImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formPayload = new FormData();
    for (const key in formData) {
      formPayload.append(key, formData[key as keyof typeof formData]);
    }
    
    if (heroImage) {
      formPayload.append('heroImage', heroImage);
    }

    try {
      const response = await fetch('/api/admin/home', {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error('Failed to update home content');
      }

      toast.success('Home page updated successfully');
    } catch (error) {
      console.error('Error updating home page:', error);
      toast.error('Failed to update home page');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Home Page</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Hero Section</h2>
          
          <div className="mb-4">
            <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Hero Title
            </label>
            <input
              type="text"
              id="heroTitle"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Hero Subtitle
            </label>
            <input
              type="text"
              id="heroSubtitle"
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero Image
            </label>
            <ClientImageUploader 
              onImageSelected={handleImageUpload}
              previewImage={previewImage}
            />
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Welcome Section</h2>
          
          <div className="mb-4">
            <label htmlFor="welcomeTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Welcome Title
            </label>
            <input
              type="text"
              id="welcomeTitle"
              name="welcomeTitle"
              value={formData.welcomeTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="welcomeText" className="block text-sm font-medium text-gray-700 mb-1">
              Welcome Text
            </label>
            <textarea
              id="welcomeText"
              name="welcomeText"
              rows={4}
              value={formData.welcomeText}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
