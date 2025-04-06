import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tour Destinations – Shubham Travel',
  description: 'Explore our curated selection of tour destinations across India. Visit majestic palaces, serene beaches, and spiritual landmarks with expert guides.',
  keywords: ['India destinations', 'tourist places', 'heritage sites', 'cultural tours', 'adventure destinations'],
  openGraph: {
    title: 'Tour Destinations – Shubham Travel',
    description: 'Discover the most beautiful and culturally rich destinations across India.',
    images: [
      {
        url: '/tours-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'India Tour Destinations',
      },
    ],
  },
};

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
