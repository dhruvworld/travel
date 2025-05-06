"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { Trash, Upload, Tag, X } from 'lucide-react';

type Offer = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  cloudId: string;
  active: boolean;
};

export default function OffersEditor() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    image: '',
    cloudId: ''
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/offers');
      if (!response.ok) throw new Error('Failed to fetch offers');
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast.error('Failed to load offers');
    } finally {
      setLoading(false);
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const file = acceptedFiles[0]; // Only use the first file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'travel');
      
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        throw new Error('Cloudinary cloud name is not configured');
      }
      
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      
      if (!uploadResponse.ok) throw new Error('Failed to upload image');
      
      const uploadData = await uploadResponse.json();
      
      // Update the form with the uploaded image info
      setForm({
        ...form,
        image: uploadData.secure_url,
        cloudId: uploadData.public_id
      });
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false,
    disabled: uploading
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleAddOffer = async () => {
    if (!form.title || !form.image) {
      toast.error('Title and image are required');
      return;
    }
    
    try {
      const response = await fetch('/api/admin/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (!response.ok) throw new Error('Failed to add offer');
      
      const newOffer = await response.json();
      setOffers([newOffer, ...offers]);
      setForm({
        title: '',
        subtitle: '',
        image: '',
        cloudId: ''
      });
      toast.success('Offer added successfully');
    } catch (error) {
      console.error('Error adding offer:', error);
      toast.error('Failed to add offer');
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/offers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          active: !currentActive
        })
      });
      
      if (!response.ok) throw new Error('Failed to update offer');
      
      setOffers(offers.map(offer => 
        offer.id === id ? { ...offer, active: !currentActive } : offer
      ));
      toast.success(`Offer ${!currentActive ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating offer:', error);
      toast.error('Failed to update offer');
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    
    try {
      const response = await fetch(`/api/admin/offers/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete offer');
      
      setOffers(offers.filter(offer => offer.id !== id));
      toast.success('Offer deleted successfully');
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading offers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-medium mb-4">Add New Offer</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input 
              type="text" 
              name="title" 
              value={form.title} 
              onChange={handleFormChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. Summer Special 20% Off"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input 
              type="text" 
              name="subtitle" 
              value={form.subtitle} 
              onChange={handleFormChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. Book before June 30th"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Offer Image *</label>
            
            {form.image ? (
              <div className="mb-2">
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  <img 
                    src={form.image} 
                    alt="Offer preview" 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    onClick={() => setForm({...form, image: '', cloudId: ''})}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 transition-colors text-center cursor-pointer ${
                  isDragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : uploading 
                      ? 'border-yellow-400 bg-yellow-50' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center space-y-2">
                  {uploading ? (
                    <>
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <p className="text-sm font-medium">Uploading... {uploadProgress}%</p>
                      <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className={isDragActive ? 'text-blue-500' : 'text-gray-400'} size={36} />
                      <p className="font-medium">{isDragActive ? 'Drop the image here' : 'Drop image here or click to select'}</p>
                      <p className="text-xs text-gray-500">Recommended size: 1200x400px</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleAddOffer}
              disabled={!form.title || !form.image}
              className={`px-4 py-2 rounded transition ${
                !form.title || !form.image
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Add Offer
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="font-medium">Existing Offers</h3>
        
        {offers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map(offer => (
              <div 
                key={offer.id} 
                className={`border rounded-lg overflow-hidden shadow ${
                  !offer.active ? 'opacity-70' : ''
                }`}
              >
                <div className="relative h-36">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleActive(offer.id, offer.active)}
                        className={`px-3 py-1 rounded text-white ${
                          offer.active ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      >
                        {offer.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="px-3 py-1 rounded bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-lg">{offer.title}</h4>
                  {offer.subtitle && (
                    <p className="text-gray-600">{offer.subtitle}</p>
                  )}
                  <div className="mt-2 flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      offer.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {offer.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
            No offers created yet. Create one using the form above.
          </div>
        )}
      </div>
    </div>
  );
}
