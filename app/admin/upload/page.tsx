'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Instead of directly using a component with onUploadComplete props,
// use dynamic import with ssr: false to ensure it's only rendered client-side
const DynamicUploader = dynamic(() => import('@/app/admin/components/DynamicUploader'), { ssr: false });

export default function UploadPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    toast.success('Image uploaded successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Image Upload</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <DynamicUploader onImageUpload={handleImageUpload} />
        
        {uploadedImage && (
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-2">Uploaded Image:</h2>
            <div className="border rounded-lg overflow-hidden max-w-md">
              <img src={uploadedImage} alt="Uploaded" className="w-full h-auto" />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Image URL: <code className="bg-gray-100 px-1 py-0.5 rounded">{uploadedImage}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}