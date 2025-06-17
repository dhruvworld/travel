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
  metadataBase: new URL('https://shubhamtravel.in'),
  title: {
    default: 'Shubham Tours – Explore India & Beyond',
    template: '%s | Shubham Tours'
  },
  description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Tours. Discover India\'s hidden gems with our expert guides.',
  keywords: [
    'Travel India',
    'Tour Packages',
    'Shubham Tours', 
    'Custom Tours',
    'Adventure Holidays',
    'India tourism',
    'Golden Triangle tour',
    'Kerala backwaters',
    'Rajasthan tours',
    'Himachal Pradesh tours',
    'Ladakh tours',
    'Spiti Valley tours'
  ],
  authors: [{ name: 'Shubham Tours', url: 'https://shubhamtravel.in' }],
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
    url: 'https://shubhamtravel.in',
    title: 'Shubham Tours – Explore India & Beyond',
    description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Tours.',
    siteName: 'Shubham Tours',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Shubham Tours - Your Gateway to Incredible India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubham Tours – Explore India & Beyond',
    description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Tours.',
    images: ['/images/logo.png'],
    creator: '@shubhamtravelIN',
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
    canonical: 'https://shubhamtravel.in',
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
  description: 'Your trusted travel partner for unforgettable experiences in India',
  url: 'https://shubhamtravel.in',
  logo: 'https://shubhamtravel.in/images/logo.png',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-XXXXXXXXXX',
    contactType: 'customer service'
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
