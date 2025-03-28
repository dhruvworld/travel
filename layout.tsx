// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shuham Tours & Travels - Discover the Magic of India',
  description: 'Experience the best of India with Shuham Tours & Travels. We offer curated tours, comfortable accommodations, and unforgettable experiences.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Toaster />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
