'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type GalleryImage = {
  id: string
  url: string
  category: string
}

export default function ImageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/admin/images?category=gallery')
        const data = await response.json()
        setImages(data)
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading) {
    return <div>Loading gallery...</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square group">
          <Image
            src={image.url}
            alt="Gallery image"
            fill
            className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
} 