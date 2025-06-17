// app/page.tsx

import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturedPackagesSection from '@/components/sections/FeaturedPackagesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import GallerySection from '@/components/sections/GallerySection'
import ContactSection from '@/components/sections/ContactSection'
import type { TravelPackage } from '@/types/travel'
import FAQSection from '@/components/sections/FAQSection'

export const dynamic = 'auto'

// Static featured packages data
const featuredPackages: TravelPackage[] = [
  {
    id: "1",
    name: "Ladakh Adventure",
    description: "Explore the cold desert, monasteries, and pristine lakes of Ladakh.",
    image: "/images/package-img/ladakh/1.jpeg",
    slug: "ladakh-adventure",
    featured: true,
    duration: "7 days",
    location: "Ladakh",
    category: "Adventure",
    amenities: ["Hotel", "Meals", "Transport", "Guide"],
    itinerary: [
      { day: 1, description: "Arrival in Leh and acclimatization" },
      { day: 2, description: "Local sightseeing and monastery visits" }
    ]
  },
  {
    id: "2",
    name: "Kasol Escape",
    description: "Relax in the serene valleys and enjoy the hippie vibes of Kasol.",
    image: "/images/package-img/kasol/1.jpeg",
    slug: "kasol-escape",
    featured: true,
    duration: "4 days",
    location: "Himachal Pradesh",
    category: "Nature",
    amenities: ["Hotel", "Meals", "Transport", "Guide"],
    itinerary: [
      { day: 1, description: "Arrival and local exploration" },
      { day: 2, description: "Trek to Kheerganga" }
    ]
  },
  {
    id: "3",
    name: "Spiti Valley Ride",
    description: "Ride through one of India's most breathtaking and remote valleys.",
    image: "/images/package-img/spiti/1.jpeg",
    slug: "spiti-valley-ride",
    featured: true,
    duration: "6 days",
    location: "Himachal Pradesh",
    category: "Adventure",
    amenities: ["Hotel", "Meals", "Transport", "Guide"],
    itinerary: [
      { day: 1, description: "Arrival and orientation" },
      { day: 2, description: "Visit ancient monasteries" }
    ]
  }
]

export const metadata: Metadata = {
  title: 'Shubham Tours - Best Travel Agency in Ahmedabad | Tour Packages India',
  description: 'Shubham Tours - Leading travel agency in Ahmedabad offering best tour packages across India. Book Ladakh, Manali, Goa, Kerala tours with expert guides. Call +91 97379 90335',
  keywords: [
    'Shubham Tours',
    'Shubham Travels',
    'Travel Agency Ahmedabad',
    'Tour Packages India',
    'Ladakh Tour Package',
    'Manali Tour Package',
    'Goa Tour Package',
    'Kerala Tour Package',
    'Rajasthan Tour Package',
    'Golden Triangle Tour',
    'Car Rental Ahmedabad',
    'Hotel Booking India',
    'Custom Tours India',
    'Adventure Tours India',
    'Holiday Packages India',
    'Travel Company Ahmedabad',
    'Tour Operator Gujarat',
    'India Tourism',
    'Domestic Tours',
    'International Tours'
  ],
  openGraph: {
    title: 'Shubham Tours - Best Travel Agency in Ahmedabad | India Tour Packages',
    description: 'Shubham Tours is the leading travel agency in Ahmedabad, India. Book the best tour packages, car rentals, and hotel bookings across India.',
    url: 'https://shubhamtours.com',
    siteName: 'Shubham Tours',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Shubham Tours - Your Gateway to Incredible India',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubham Tours - Best Travel Agency in Ahmedabad | India Tour Packages',
    description: 'Shubham Tours is the leading travel agency in Ahmedabad, India. Book the best tour packages, car rentals, and hotel bookings across India.',
    images: ['/images/hero.jpg'],
  },
  alternates: {
    canonical: 'https://shubhamtours.com',
  },
};

// Structured data for the homepage
const homePageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Shubham Tours - Best Travel Agency in Ahmedabad',
  description: 'Leading travel agency in Ahmedabad offering best tour packages across India. Specializing in Ladakh, Manali, Goa, Kerala, and Rajasthan tours.',
  url: 'https://shubhamtours.com',
  mainEntity: {
    '@type': 'TravelAgency',
    name: 'Shubham Tours',
    description: 'Leading travel agency in Ahmedabad offering best tour packages across India',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10, Yogeshwar Twin Bungalows, New Ranip',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '382481',
      addressCountry: 'IN'
    },
    telephone: '+91-97379-90335',
    email: 'info@shubhamtours.com'
  }
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageStructuredData) }}
      />
      <main className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <FeaturedPackagesSection packages={featuredPackages} />
        <TestimonialsSection />
        <GallerySection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  )
}
