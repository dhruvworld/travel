import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturedPackagesSection from '@/components/sections/FeaturedPackagesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import GallerySection from '@/components/sections/GallerySection'
import ContactSection from '@/components/sections/ContactSection'
import OffersSection from '@/components/sections/OffersSection'
import Footer from '@/components/sections/Footer'
import { getFeaturedPackages } from '@/lib/services/firebase-package'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let packages = []
  try {
    packages = await getFeaturedPackages()
  } catch (e) {
    console.error("Failed to fetch featured packages:", e)
  }

  return (
    <>
      <main className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <FeaturedPackagesSection packages={packages} />
        <OffersSection />
        <TestimonialsSection />
        <GallerySection />
        <ContactSection />
      </main>
    </>
  )
}
