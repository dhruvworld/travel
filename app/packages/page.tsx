// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

import { getAllPackages } from '@/lib/prisma/packages';
import Link from 'next/link';
import ClientImage from '@/app/components/ClientImage';

export default async function PackagesPage() {
  // Safely fetch packages with error handling
  let packages = [];
  try {
    packages = await getAllPackages();
  } catch (error) {
    console.error('Error fetching packages:', error);
    // Continue with empty array
  }

  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Travel Packages</h1>
      <p className="text-xl text-gray-600 text-center mb-16">
        Discover our carefully curated travel experiences across India
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.length > 0 ? (
          packages.map((pkg: any) => (
            <div key={pkg.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                {pkg.image ? (
                  <ClientImage
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2574&auto=format&fit=crop"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">
                  {pkg.description?.substring(0, 120) || 'Explore this amazing travel package with highlights and key features.'}
                  {pkg.description?.length > 120 ? '...' : ''}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{pkg.price?.toLocaleString() || 'Contact for price'}
                  </span>
                  <Link
                    href={`/packages/${pkg.slug || pkg.id}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Placeholder card layout when no packages are available
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Package Title</h3>
                <p className="text-gray-600 mb-4">
                  Short description of this amazing travel package with highlights and key features.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">₹XX,XXX</span>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-not-allowed opacity-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}