// Force dynamic rendering for this page to prevent build hang
export const dynamic = 'force-dynamic';

import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedPackagesSection from '@/components/sections/FeaturedPackagesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Explore India & Beyond | Premier Travel Agency',
  description: 'Experience the magic of India with custom travel packages, guided tours, and unforgettable adventures. Your journey begins with Shubham Travel.',
  openGraph: {
    images: [
      {
        url: '/home-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'Shubham Travel - Explore India',
      },
    ],
  },
};

export default async function HomePage() {
  return (
    <>
      <Script id="organization-structured-data" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Shubham Travel",
            "url": "https://shubhamtravel.in",
            "logo": "https://shubhamtravel.in/logo.png",
            "description": "Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Travel.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Yogeshwar Twin Bauglo, 10",
              "addressLocality": "New Ranip, Ahmedabad",
              "addressRegion": "Gujarat",
              "postalCode": "382481",
              "addressCountry": "India"
            },
            "telephone": "+91 97379 90335",
            "email": "info@shuhamtours.com",
            "sameAs": [
              "https://facebook.com/shubhamtravel",
              "https://instagram.com/shubhamtravel",
              "https://twitter.com/shubhamtravel"
            ]
          }
        `}
      </Script>
      <main className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <Suspense fallback={
          <div className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Featured Tour Packages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          {/* @ts-expect-error Async Server Component */}
          <FeaturedPackagesSection />
        </Suspense>
        <TestimonialsSection />
        <GallerySection />
        <ContactSection />
      </main>
    </>
  );
}