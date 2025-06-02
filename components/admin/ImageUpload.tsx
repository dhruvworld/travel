'use client';

<<<<<<< HEAD
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
=======
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Upload, X, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  multiple?: boolean;
  className?: string;
}

export default function ImageUpload({ 
  onUploadComplete, 
  multiple = false, 
  className = '' 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!cloudName || !uploadPreset) {
        setError('Cloudinary configuration is missing. Please check your environment variables.');
        return;
      }

      setUploading(true);
      setError(null);
      setSuccess(false);
      setUploadProgress(0);

      try {
        const uploads = acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', uploadPreset);
          formData.append('folder', 'travel-site');

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const progress = progressEvent.total 
                  ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  : 0;
                setUploadProgress(progress);
              }
            }
          );

          return res.data.secure_url;
        });

        const results = await Promise.all(uploads);
        results.forEach(url => onUploadComplete(url));
        
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        console.error('Upload error:', err);
        setError('Failed to upload image. Please try again.');
      } finally {
        setUploading(false);
      }
    },
    [onUploadComplete, cloudName, uploadPreset]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple,
    disabled: uploading,
  });

  return (
    <div className={`${className}`}>
      <div
        {...getRootProps()}
        className={`border-dashed border-2 rounded-xl p-6 text-center cursor-pointer transition ${
          isDragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : uploading 
              ? 'border-yellow-400 bg-yellow-50' 
              : error 
                ? 'border-red-400 bg-red-50'
                : success
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          {uploading ? (
            <>
              <div className="animate-spin mb-2">
                <Upload size={24} className="text-indigo-500" />
              </div>
              <p className="text-sm">Uploading... {uploadProgress}%</p>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </>
          ) : error ? (
            <>
              <X size={24} className="text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
              <p className="text-xs text-gray-500">Click to try again</p>
            </>
          ) : success ? (
            <>
              <CheckCircle size={24} className="text-green-500" />
              <p className="text-sm text-green-500">Upload successful!</p>
            </>
          ) : (
            <>
              <Upload size={24} className="text-gray-400" />
              <p className="text-sm">
                <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG or WEBP (max 5MB)
                {multiple && ' • Upload multiple files'}
              </p>
            </>
          )}
        </div>
      </div>
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    </div>
  );
}
