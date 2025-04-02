import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Shuham Tours & Travels',
  description: 'Learn about our travel agency and our mission to provide exceptional travel experiences.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
