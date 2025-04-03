import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import AboutSection from '@/components/sections/AboutSection';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us – Shubham Travel',
  description: 'Learn about our journey, team, and what makes Shubham Travel unique. Discover our values, mission, and commitment to exceptional travel experiences across India.',
  keywords: ['about Shubham Travel', 'travel agency history', 'travel experts', 'India tour company', 'Shubham Travel values'],
  openGraph: {
    title: 'About Us – Shubham Travel',
    description: 'Learn about our journey, team, and what makes Shubham Travel unique.',
    images: [
      {
        url: '/image/about-us.jpg',
        width: 1200,
        height: 630,
        alt: 'Shubham Travel Team',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Script id="about-breadcrumb-structured-data" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://shubhamtravel.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About Us",
                "item": "https://shubhamtravel.in/about"
              }
            ]
          }
        `}
      </Script>
      <main className="bg-white">
        <div className="relative h-[300px] bg-blue-600">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Company</h1>
              <p className="text-xl">Discover the story behind Shubham Travel</p>
            </div>
          </div>
        </div>
        
        <AboutSection />
      </main>
    </>
  );
}