'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUploadComplete?: (imageUrl: string) => void;
  maxSizeMB?: number;
  acceptedFileTypes?: string;
}

export default function ImageUpload({
  onUploadComplete,
  maxSizeMB = 5,
  acceptedFileTypes = 'image/jpeg, image/png, image/webp'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size exceeds the ${maxSizeMB}MB limit`);
      return;
    }
    
    // Validate file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(`File type not supported. Please upload ${acceptedFileTypes}`);
      return;
    }
    
    setError(null);
    setIsUploading(true);
    
    // Demo progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      // Replace with your actual upload logic
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      
      // Complete progress
      setProgress(100);
      setTimeout(() => {
        clearInterval(interval);
        setIsUploading(false);
        setProgress(0);
        if (onUploadComplete) {
          onUploadComplete(data.imageUrl);
        }
      }, 500);
      
    } catch (error) {
      clearInterval(interval);
      setIsUploading(false);
      setProgress(0);
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', error);
    }
  };
  
  return (
    <div className="image-upload">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <label className="block">
        <span className="sr-only">Choose file</span>
        <input 
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </label>
      
      {isUploading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-150" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">Uploading: {progress}%</p>
        </div>
      )}
    </div>
  );
}
