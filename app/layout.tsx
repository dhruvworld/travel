import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import { Toaster } from 'react-hot-toast';
import { Poppins } from 'next/font/google';
import '../styles/globals.css';
import MobileNav from '@/components/MobileNav';
import type { Metadata, Viewport } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Enhanced metadata for SEO and social sharing
export const metadata: Metadata = {
  metadataBase: new URL('https://shubhamtours.com'),
  title: {
    default: 'Shubham Tours - Best Travel Agency in Ahmedabad | India Tour Packages',
    template: '%s | Shubham Tours'
  },
  description: 'Shubham Tours is the leading travel agency in Ahmedabad, India. Book the best tour packages, car rentals, and hotel bookings across India. Trusted by thousands for Ladakh, Manali, Goa, Kerala, Rajasthan, and custom tours.',
  keywords: [
    'Shubham Tours',
    'Shubham Travels',
    'Shubham Tours Ahmedabad',
    'Shubham Travels Ahmedabad',
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
  authors: [{ name: 'Shubham Tours', url: 'https://shubhamtours.com' }],
  creator: 'Shubham Tours',
  publisher: 'Shubham Tours',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'verification_token',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shubhamtours.com',
    title: 'Shubham Tours - Best Travel Agency in Ahmedabad | India Tour Packages',
    description: 'Shubham Tours is the leading travel agency in Ahmedabad, India. Book the best tour packages, car rentals, and hotel bookings across India.',
    siteName: 'Shubham Tours',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Shubham Tours - Your Gateway to Incredible India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubham Tours - Best Travel Agency in Ahmedabad | India Tour Packages',
    description: 'Shubham Tours is the leading travel agency in Ahmedabad, India. Book the best tour packages, car rentals, and hotel bookings across India.',
    images: ['/images/hero.jpg'],
    creator: '@shubhamtoursIN',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://shubhamtours.com',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
};

// Properly define the viewport metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'light'
};

// Add structured data for the organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Shubham Tours',
  alternateName: 'Shubham Travels',
  description: 'Best travel agency in Ahmedabad, India. Book India tour packages, car rentals, and hotels with Shubham Tours.',
  url: 'https://shubhamtours.com',
  logo: 'https://shubhamtours.com/images/logo.png',
  image: 'https://shubhamtours.com/images/hero.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10, Yogeshwar Twin Bungalows, New Ranip',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382481',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-97379-90335',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: 'English, Hindi, Gujarati'
  },
  sameAs: [
    'https://www.facebook.com/shubhamtours',
    'https://www.instagram.com/shubhamtours',
    'https://twitter.com/shubhamtoursIN'
  ],
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  serviceArea: {
    '@type': 'Country',
    name: 'India'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tour Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'TouristTrip',
          name: 'Ladakh Adventure Tour',
          description: 'Experience the breathtaking landscapes of Ladakh'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'TouristTrip',
          name: 'Manali Getaway Tour',
          description: 'Discover the beauty of Manali'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'TouristTrip',
          name: 'Kerala Backwaters Tour',
          description: 'Explore the serene backwaters of Kerala'
        }
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1'
  },
  foundingDate: '2010',
  founder: {
    '@type': 'Person',
    name: 'Jayendra Patel'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-white text-dark min-h-screen flex flex-col">
        <Providers>
          <Toaster position="top-right" toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }} />
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
