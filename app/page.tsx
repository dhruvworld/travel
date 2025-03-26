'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import PhotoCarousel from './components/PhotoCarousel';
import GoogleReviews from './components/GoogleReviews';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Beautiful landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover India's Beauty
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience the magic of incredible India with our curated tours
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/tours"
              className="bg-white text-black px-8 py-3 rounded-full hover:bg-opacity-90 transition"
            >
              Explore Tours
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <p className="mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              title="Tour Packages"
              description="Curated tours across India"
              icon="🏰"
              link="/tours"
            />
            <ServiceCard
              title="Car Rental"
              description="Comfortable and reliable vehicles"
              icon="🚗"
              link="/car-rental"
            />
            <ServiceCard
              title="Hotel Booking"
              description="Best accommodations nationwide"
              icon="🏨"
              link="/hotels"
            />
            <ServiceCard
              title="Custom Tours"
              description="Personalized travel experiences"
              icon="✨"
              link="/custom-tours"
            />
          </div>
        </div>
      </motion.section>

      {/* Photo Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Travel Memories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of stunning travel photos from our happy customers. 
              Each image tells a unique story of adventure and discovery.
            </p>
          </div>
          <PhotoCarousel />
        </div>
      </section>

      {/* Featured Destinations */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold text-center mb-12"
          >
            Popular Destinations
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DestinationCard
              image="/taj-mahal.jpg"
              title="Taj Mahal"
              location="Agra"
              description="Symbol of eternal love, one of the seven wonders of the world."
            />
            <DestinationCard
              image="/jaipur.jpg"
              title="City Palace"
              location="Jaipur"
              description="Royal residence with stunning architecture and rich history."
            />
            <DestinationCard
              image="/kerala.jpg"
              title="Backwaters"
              location="Kerala"
              description="Serene waterways and lush tropical landscapes."
            />
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold text-center mb-12"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🌟"
              title="Expert Guides"
              description="Professional and knowledgeable local guides"
            />
            <FeatureCard
              icon="💰"
              title="Best Prices"
              description="Competitive prices and exclusive deals"
            />
            <FeatureCard
              icon="🛡️"
              title="Safe Travel"
              description="Your safety is our top priority"
            />
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold text-center mb-12"
          >
            What Our Customers Say
          </motion.h2>
          <GoogleReviews />
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-blue-600 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-8">
            Get the latest updates and exclusive offers straight to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-black"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.section>
    </main>
  );
}

// Service Card Component
function ServiceCard({ title, description, icon, link }: {
  title: string
  description: string
  icon: string
  link: string
}) {
  return (
    <motion.div variants={fadeIn}>
      <Link href={link}>
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition h-full flex flex-col">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 flex-grow">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}

// Destination Card Component
function DestinationCard({ image, title, location, description }: {
  image: string
  title: string
  location: string
  description: string
}) {
  return (
    <motion.div
      variants={fadeIn}
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
    >
      <div className="relative h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{location}</p>
        <p className="text-gray-500">{description}</p>
      </div>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: string
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={fadeIn}
      className="text-center p-6"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
