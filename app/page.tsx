// app/page.tsx

import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturedPackagesSection from '@/components/sections/FeaturedPackagesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import GallerySection from '@/components/sections/GallerySection'
import ContactSection from '@/components/sections/ContactSection'
import type { TravelPackage } from '@/types/travel'

export const dynamic = 'auto'

// Static featured packages data
const featuredPackages: TravelPackage[] = [
  {
    id: "1",
    name: "Bali Adventure",
    description: "Experience the beauty of Bali with our comprehensive tour package.",
    image: "/images/packages/bali.jpg",
    slug: "bali-adventure",
    featured: true,
    duration: "7 days",
    location: "Bali, Indonesia",
    category: "Adventure",
    amenities: ["Hotel", "Meals", "Transport", "Guide"],
    itinerary: [
      { day: 1, description: "Arrival and welcome dinner" },
      { day: 2, description: "Temple tour and cultural experience" }
    ]
  },
  {
    id: "2",
    name: "Paris Getaway",
    description: "Discover the romance of Paris with our exclusive city tour.",
    image: "/images/packages/paris.jpg",
    slug: "paris-getaway",
    featured: true,
    duration: "5 days",
    location: "Paris, France",
    category: "City Tour",
    amenities: ["Hotel", "Meals", "Transport", "Guide"],
    itinerary: [
      { day: 1, description: "Eiffel Tower visit" },
      { day: 2, description: "Louvre Museum tour" }
    ]
  },
  {
    id: "3",
    name: "Tokyo Explorer",
    description: "Immerse yourself in the vibrant culture of Tokyo.",
    image: "/images/packages/tokyo.jpg",
    slug: "tokyo-explorer",
    featured: true,
    duration: "6 days",
    location: "Tokyo, Japan",
    category: "Cultural",
    amenities: ["Hotel", "Meals", "Transport", "Guide"],
    itinerary: [
      { day: 1, description: "City orientation" },
      { day: 2, description: "Temple visits" }
    ]
  }
]

export default async function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <FeaturedPackagesSection packages={featuredPackages} />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </main>
  )
}
