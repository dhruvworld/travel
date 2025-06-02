import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hotel Bookings – Shubham Tours',
  description: 'Book handpicked hotels and accommodations for your trip. We offer options for every budget, from luxury resorts to boutique stays across India.',
  keywords: ['hotel booking', 'luxury hotels', 'budget accommodations', 'India hotels', 'travel accommodation'],
  openGraph: {
    title: 'Hotel Bookings – Shubham Tours',
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

export default function HotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
