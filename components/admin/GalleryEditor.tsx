'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { Trash, Upload, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

type Photo = {
  id: string;
  url: string;
  cloudId: string;
};

export default function GalleryEditor() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch photos from the server
  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/gallery', {
        cache: 'no-store'
      });
      
      if (!response.ok) throw new Error('Failed to fetch gallery photos');
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      toast.error('Failed to load gallery photos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Handle file uploads
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Process files in batches to avoid overwhelming the server
      const batchSize = 3;
      const totalFiles = acceptedFiles.length;
      let processedFiles = 0;
      
      for (let i = 0; i < totalFiles; i += batchSize) {
        const batch = acceptedFiles.slice(i, i + batchSize);
        const batchPromises = batch.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'travel');
          
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
          if (!cloudName) {
            throw new Error('Cloudinary configuration missing');
          }
          
          const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
          
          if (!uploadResponse.ok) throw new Error('Failed to upload to Cloudinary');
          
          const uploadData = await uploadResponse.json();
          
          // Save to our database
          const apiResponse = await fetch('/api/admin/gallery', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: uploadData.secure_url,
              cloudId: uploadData.public_id,
            }),
          });
          
          if (!apiResponse.ok) throw new Error('Failed to save photo');
          
          processedFiles++;
          setUploadProgress(Math.round((processedFiles / totalFiles) * 100));
          
          return await apiResponse.json();
        });
        
        const batchResults = await Promise.all(batchPromises);
        setPhotos(prev => [...batchResults, ...prev]);
      }
      
      toast.success(`Uploaded ${totalFiles} photo${totalFiles !== 1 ? 's' : ''} successfully`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    disabled: uploading
  });

  const deletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete photo');
      
      setPhotos(photos.filter(photo => photo.id !== id));
      toast.success('Photo deleted successfully');
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Failed to delete photo');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading gallery photos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
              <p className="font-medium">{isDragActive ? 'Drop the files here' : 'Drop image files here or click to select'}</p>
              <p className="text-xs text-gray-500">Upload multiple files at once</p>
            </>
          )}
        </div>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="group relative">
              <div className="aspect-square relative rounded-lg overflow-hidden border">
                <img 
                  src={photo.url} 
                  alt="Gallery photo" 
                  className="object-cover w-full h-full" 
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  title="Delete photo"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
          No photos in gallery. Add some using the upload area above.
        </div>
      )}
    </div>
  );
}
