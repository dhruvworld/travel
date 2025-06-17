// page.tsx
import type { Metadata } from 'next';
import CarRentalClientComponent from './CarRentalClientComponent';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Car Rental Services in Ahmedabad – Shubham Tours | Best Vehicle Hire',
  description: 'Book car rental services in Ahmedabad with Shubham Tours. Choose from our fleet of cars, SUVs, tempo travelers, and luxury vehicles with professional drivers. Best rates guaranteed.',
  keywords: [
    'car rental Ahmedabad',
    'car rental Gujarat',
    'vehicle hire Ahmedabad',
    'driver services Ahmedabad',
    'travel transportation Gujarat',
    'luxury car rental Ahmedabad',
    'SUV rental Ahmedabad',
    'tempo traveler hire',
    'bus rental Ahmedabad',
    'Shubham Tours car rental'
  ],
  openGraph: {
    title: 'Car Rental Services in Ahmedabad – Shubham Tours',
    description: 'Book reliable and comfortable transportation for your trip across Gujarat and India. Professional drivers and well-maintained vehicles.',
    images: [
      {
        url: '/images/cars/dzire/1.jpg',
        width: 1200,
        height: 630,
        alt: 'Car Rental Services by Shubham Tours in Ahmedabad',
      },
    ],
  },
};

// Structured data for car rental services
const carRentalStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Car Rental Services',
  description: 'Professional car rental services in Ahmedabad, Gujarat. Rent cars, SUVs, tempo travelers, and luxury vehicles with experienced drivers.',
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
    '@type': 'City',
    name: 'Ahmedabad'
  },
  serviceType: 'Car Rental',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vehicle Fleet',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Swift Dzire',
          description: 'Comfortable sedan for city and highway travel'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Mahindra Thar',
          description: 'Adventure SUV for off-road and mountain trips'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Tempo Traveler',
          description: 'Spacious vehicle for group travel and tours'
        }
      }
    ]
  }
};

export default function CarRentalPage() {
  return (
    <>
      <Script
        id="car-rental-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carRentalStructuredData) }}
      />
      <CarRentalClientComponent />
    </>
  );
}