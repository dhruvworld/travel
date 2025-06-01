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
