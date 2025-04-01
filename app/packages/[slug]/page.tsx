import { notFound } from 'next/navigation'
import { getPackageById } from '@/lib/prisma/packages'
import Image from 'next/image'

export default async function PackageDetailPage({ 
  params: { slug } 
}: { 
  params: { slug: string } 
}) {
  const pkg = await getPackageById(slug)
  
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
