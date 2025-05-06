"use client";

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isUploading?: boolean;
  acceptedTypes?: string;
}

export default function ImageUploader({ 
  onImageSelect, 
  isUploading = false,
  acceptedTypes = "image/jpeg, image/png, image/webp"
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass the file to parent component
    onImageSelect(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      {preview ? (
        <div className="relative h-40 w-full md:w-1/2 rounded-md overflow-hidden bg-gray-100">
          <img 
            src={preview} 
            alt="Preview" 
            className="h-full w-full object-cover"
          />
          <button
            onClick={clearPreview}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            disabled={isUploading}
          >
            <X size={16} className="text-gray-700" />
          </button>
          
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-sm">Uploading...</div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`w-full md:w-1/2 h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept={acceptedTypes}
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin mb-2">
                <Upload size={24} className="text-indigo-500" />
              </div>
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : (
            <>
              <ImageIcon size={36} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or WEBP (Max 5MB)
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
