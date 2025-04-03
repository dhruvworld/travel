import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Popular Destinations – Shubham Travel',
  description: 'Explore the most beautiful and culturally rich destinations across India. Plan your visit to iconic landmarks and hidden gems.',
  keywords: ['India destinations', 'popular tourist places', 'travel destinations', 'places to visit in India'],
  openGraph: {
    title: 'Popular Destinations – Shubham Travel',
    description: 'Discover incredible places to visit across India with Shubham Travel.',
    images: [
      {
        url: '/destinations-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'Beautiful travel destinations in India',
      },
    ],
  },
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Destinations Coming Soon</h1>
      <p className="text-gray-600">We're working on adding amazing destinations for you.</p>
    </div>
  );
}
