import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Rental Services – Shubham Travel',
  description: 'Rent comfortable and reliable vehicles for your journey across India. Choose from our fleet of cars, SUVs, and luxury vehicles with professional drivers.',
  keywords: ['car rental India', 'vehicle hire', 'driver services', 'travel transportation', 'luxury car rental'],
  openGraph: {
    title: 'Car Rental Services – Shubham Travel',
    description: 'Get reliable and comfortable transportation for your trip.',
    images: [
      {
        url: '/car-rental-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Car Rental Services',
      },
    ],
  },
};

export default function CarRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
