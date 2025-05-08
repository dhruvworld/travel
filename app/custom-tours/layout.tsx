import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Tour Packages – Shubham Tours',
  description: 'Create your own personalized travel experience with our custom tour services. Tell us your preferences and we\'ll plan the perfect itinerary for you.',
  keywords: ['custom travel packages', 'personalized tours', 'bespoke travel', 'tailor-made itineraries', 'private tours India'],
  openGraph: {
    title: 'Custom Tour Packages – Shubham Tours',
    description: 'Design your own perfect travel experience with our personalized tour services.',
    images: [
      {
        url: '/custom-tours-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'Customized Travel Experiences',
      },
    ],
  },
};

export default function CustomToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
