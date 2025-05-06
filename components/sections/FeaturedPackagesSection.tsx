// components/sections/FeaturedPackagesSection.tsx
'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import type { TravelPackage } from '@/lib/services/firebase-package'

export interface FeaturedPackagesSectionProps {
  packages: TravelPackage[]
}

const FeaturedPackagesSection: FC<FeaturedPackagesSectionProps> = ({ packages }) => {
  if (packages.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Featured Packages</h2>
          <p>No featured packages available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-2xl shadow-sm p-6 flex flex-col"
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
              <p className="flex-1 text-gray-600 mb-4">{pkg.description}</p>
              <div className="mt-auto">
                <span className="text-lg font-bold">${pkg.price}</span>
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="inline-block ml-4 text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedPackagesSection
