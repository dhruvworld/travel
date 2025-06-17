'use client';

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
</div>
  );
}
