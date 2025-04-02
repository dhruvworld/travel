export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import ImageUpload from '../components/ImageUpload'

export default function AdminGalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Gallery Management</h1>
      <ImageUpload />
    </div>
  )
}