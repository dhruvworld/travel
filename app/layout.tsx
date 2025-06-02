import { Providers } from './providers';
<<<<<<< HEAD
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

// Define the Poppins font with specific subsets and weights
=======
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer'; // Import directly
import { Toaster } from 'react-hot-toast';
import { Poppins } from 'next/font/google';
import '../styles/globals.css';
import MobileNav from '@/components/MobileNav';
import type { Metadata } from 'next'

>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
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
<<<<<<< HEAD
    default: 'Shubham Travel – Explore India & Beyond',
    template: '%s | Shubham Travel'
  },
  description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Travel.',
  keywords: [
    'Travel India',
    'Tour Packages',
    'Shubham Travel', 
=======
    default: 'Shubham Tours – Explore India & Beyond',
    template: '%s | Shubham Tours'
  },
<<<<<<< HEAD
  description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Tours. Discover India\'s hidden gems with our expert guides.',
=======
  description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Tours.',
>>>>>>> 71dd6a2d7891fabe7a464e7bf3442ff76ebe9671
  keywords: [
    'Travel India',
    'Tour Packages',
    'Shubham Tours', 
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    'Custom Tours',
    'Adventure Holidays',
    'India tourism',
    'Golden Triangle tour',
    'Kerala backwaters',
<<<<<<< HEAD
    'Rajasthan tours'
  ],
  authors: [{ name: 'Shubham Travel', url: 'https://shubhamtravel.in' }],
  creator: 'Shubham Travel',
=======
<<<<<<< HEAD
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
=======
    'Rajasthan tours'
  ],
  authors: [{ name: 'Shubham Tours', url: 'https://shubhamtravel.in' }],
  creator: 'Shubham Tours',
>>>>>>> 71dd6a2d7891fabe7a464e7bf3442ff76ebe9671
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
  verification: {
    google: 'verification_token',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shubhamtravel.in',
<<<<<<< HEAD
    title: 'Shubham Travel – Explore India & Beyond',
    description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Travel.',
    siteName: 'Shubham Travel',
=======
    title: 'Shubham Tours – Explore India & Beyond',
    description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Tours.',
    siteName: 'Shubham Tours',
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
<<<<<<< HEAD
        alt: 'Shubham Travel - Your Gateway to Incredible India',
=======
        alt: 'Shubham Tours - Your Gateway to Incredible India',
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
<<<<<<< HEAD
    title: 'Shubham Travel – Explore India & Beyond',
    description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Travel.',
=======
    title: 'Shubham Tours – Explore India & Beyond',
    description: 'Book breathtaking tours, custom travel packages, and unforgettable experiences with Shubham Tours.',
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
      'max-video-preview': -1,
=======
>>>>>>> 71dd6a2d7891fabe7a464e7bf3442ff76ebe9671
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
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
<<<<<<< HEAD
};

// Properly define the viewport metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
};

// Properly define the viewport metadata
export const viewport = {
  width: 'device-width',
  initialScale: 1,
<<<<<<< HEAD
  maximumScale: 5,
=======
  maximumScale: 1,
>>>>>>> 71dd6a2d7891fabe7a464e7bf3442ff76ebe9671
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'light'
};

<<<<<<< HEAD
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

=======
>>>>>>> 71dd6a2d7891fabe7a464e7bf3442ff76ebe9671
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
<<<<<<< HEAD
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
=======
<<<<<<< HEAD
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
=======
>>>>>>> 71dd6a2d7891fabe7a464e7bf3442ff76ebe9671
      <body className="font-sans bg-white text-dark min-h-screen flex flex-col">
        <Providers>
          <Toaster position="top-right" />
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
          <MobileNav />
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
        </Providers>
      </body>
    </html>
  );
}
