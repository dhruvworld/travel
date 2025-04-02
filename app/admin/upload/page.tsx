'use client'

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { useState } from 'react'
import Image from 'next/image'

export default function AdminUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [category, setCategory] = useState('gallery') // Default category

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', selectedImage)
    formData.append('category', category)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Image uploaded successfully!')
        setSelectedImage(null)
        setPreview(null)
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Images</h1>

      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="gallery">Gallery</option>
            <option value="hero">Hero Images</option>
            <option value="destinations">Destinations</option>
            <option value="services">Services</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />

          {preview && (
            <div className="relative h-64 w-full mb-4">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedImage || uploading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              !selectedImage || uploading
                ? 'bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        {/* Image Gallery */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Add your uploaded images here */}
          </div>
        </div>
      </div>
    </div>
  )
}