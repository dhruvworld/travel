import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Shuham Tours & Travels',
  description: 'Learn about our travel agency and our mission to provide exceptional travel experiences across India and beyond.',
  keywords: ['about travel agency', 'India tour company', 'travel expert team', 'professional tour operators'],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
