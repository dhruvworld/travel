import { getAllPackages } from '@/lib/prisma/packages';
import Link from 'next/link'

export default async function PackagesPage() {
  const packages = await getAllPackages()

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">All Tour Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map(pkg => (
          <div key={pkg.id} className="border rounded-lg overflow-hidden">
            <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{pkg.name}</h3>
              <p className="text-gray-600">{pkg.duration} Days</p>
              <p className="text-lg font-bold mt-2">₹{pkg.price}</p>
              <Link 
                href={`/packages/${pkg.id}`}
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}