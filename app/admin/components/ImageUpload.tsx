'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    
    try {
      for (const file of acceptedFiles) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'your_upload_preset') // You'll get this from Cloudinary

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, // Replace with your cloud name
          {
            method: 'POST',
            body: formData,
          }
        )

        const data = await response.json()
        
        if (data.secure_url) {
          // Save image URL to your database
          const dbResponse = await fetch('/api/admin/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: data.secure_url,
              publicId: data.public_id,
              category: 'gallery' // or any other category
            }),
          })

          if (dbResponse.ok) {
            setImages(prev => [...prev, data.secure_url])
            toast.success('Image uploaded successfully!')
          }
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  })

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
        `}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <p>Drag & drop images here, or click to select files</p>
        )}
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={url}
              alt={`Uploaded image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 