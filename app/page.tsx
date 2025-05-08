// app/page.tsx

import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturedPackagesSection from '@/components/sections/FeaturedPackagesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import GallerySection from '@/components/sections/GallerySection'
import ContactSection from '@/components/sections/ContactSection'

import { getFeaturedPackages, TravelPackage } from '@/lib/services/firebase-package'

export const dynamic = 'auto'

export default async function HomePage() {
  let packages: TravelPackage[] = []

  try {
    packages = await getFeaturedPackages()
  } catch (e) {
    console.error('Failed to fetch featured packages:', e)
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <FeaturedPackagesSection packages={packages} />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </main>
  )
}
