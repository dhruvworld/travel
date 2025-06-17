import type { Metadata } from 'next';
import HotelsClientComponent from './HotelsClientComponent';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Hotel Booking Services in Ahmedabad – Shubham Tours | Best Accommodations',
  description: 'Book hotels across India with Shubham Tours in Ahmedabad. Get the best rates on luxury hotels, budget accommodations, and resorts. Trusted hotel booking services.',
  keywords: [
    'hotel booking Ahmedabad',
    'hotel booking Gujarat',
    'luxury hotels India',
    'budget hotels India',
    'travel accommodations',
    'resort booking',
    'hotel deals India',
    'accommodation booking',
    'Shubham Tours hotels',
    'hotel booking services'
  ],
  openGraph: {
    title: 'Hotel Booking Services in Ahmedabad – Shubham Tours',
    description: 'Get the best hotel deals across India. Book luxury hotels, budget accommodations, and resorts with Shubham Tours.',
    images: [
      {
        url: '/images/hotels/leela.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotel Booking Services by Shubham Tours',
      },
    ],
  },
};

// Structured data for hotel booking services
const hotelBookingStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hotel Booking Services',
  description: 'Professional hotel booking services in Ahmedabad. Book hotels, resorts, and accommodations across India with best rates and deals.',
  provider: {
    '@type': 'TravelAgency',
    name: 'Shubham Tours',
    url: 'https://shubhamtours.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10, Yogeshwar Twin Bungalows, New Ranip',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '382481',
      addressCountry: 'IN'
    },
    telephone: '+91-97379-90335'
  },
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  serviceType: 'Hotel Booking',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hotel Categories',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Luxury Hotels',
          description: '5-star and premium hotel accommodations'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Budget Hotels',
          description: 'Affordable and comfortable accommodations'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Resorts',
          description: 'Luxury resorts and spa accommodations'
        }
      }
    ]
  }
};

export default function Page() {
  return (
    <>
      <Script
        id="hotel-booking-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelBookingStructuredData) }}
      />
      <HotelsClientComponent />
    </>
  );
}