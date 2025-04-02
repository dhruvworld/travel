import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Shuham Tours & Travels',
  description: 'Get in touch with our team to plan your dream vacation across India.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      {children}
    </div>
  );
}
