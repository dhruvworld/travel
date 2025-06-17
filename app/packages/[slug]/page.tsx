import { notFound } from 'next/navigation'
import Image from 'next/image'

// Static package data - replace with your actual packages
const packages = [
  {
    id: 'ladakh',
    slug: 'ladakh',
    name: 'Ladakh Adventure',
    duration: 7,
    price: 25000,
    description: 'Experience the breathtaking landscapes of Ladakh with our comprehensive tour package.',
    image: '/images/package-img/ladakh/1.jpeg'
  },
  {
    id: 'manali',
    slug: 'manali',
    name: 'Manali Getaway',
    duration: 5,
    price: 18000,
    description: 'Discover the beauty of Manali with our carefully curated tour package.',
    image: '/images/package-img/manali/1.jpeg'
  },
  {
    id: 'kasol',
    slug: 'kasol',
    name: 'Kasol Trek',
    duration: 4,
    price: 12000,
    description: 'Explore the scenic trails of Kasol with our adventure tour package.',
    image: '/images/package-img/kasol/1.jpeg'
  }
]

export default async function PackageDetailPage({ 
  params: { slug } 
}: { 
  params: { slug: string } 
}) {
  const pkg = packages.find(p => p.slug === slug)
  
  if (!pkg) {
    notFound()
  }

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <Image 
        src={pkg.image} 
        alt={pkg.name} 
        width={500} 
        height={300}
        className="w-full h-96 object-cover rounded-lg"
      />
      <h1 className="text-4xl font-bold mt-8">{pkg.name}</h1>
      <div className="flex gap-4 mt-4 text-lg">
        <p>{pkg.duration} Days</p>
        <p className="font-bold">₹{pkg.price}</p>
      </div>
      <p className="mt-6 text-gray-600">{pkg.description}</p>
    </div>
  )
}
