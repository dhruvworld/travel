<<<<<<< HEAD
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import HotelsClientComponent from './HotelsClientComponent';

export const metadata: Metadata = {
  title: 'Hotel Bookings – Shubham Travel',
  description: 'Book handpicked hotels and accommodations for your trip. We offer options for every budget, from luxury resorts to boutique stays across India.',
  keywords: ['hotel booking', 'luxury hotels', 'budget accommodations', 'India hotels', 'travel accommodation'],
  openGraph: {
    title: 'Hotel Bookings – Shubham Travel',
    description: 'Find and book the perfect accommodation for your journey.',
    images: [
      {
        url: '/hotels-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Hotel Accommodations',
      },
    ],
  },
};

export default function HotelsPage() {
=======
import HotelsClientComponent from './HotelsClientComponent';

export const metadata = {
  title: 'Hotel Booking – Shubham Tours',
  description: 'Book the best hotels for your stay across India. Choose from a wide range of accommodations to suit your needs and budget.',
  keywords: ['hotel booking India', 'luxury hotels', 'budget hotels', 'travel accommodations'],
};

export default function Page() {
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
  return <HotelsClientComponent />;
}