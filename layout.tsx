// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './app/providers'; // if needed

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

import { Toaster } from 'react-hot-toast';
import { auth } from '@/lib/auth'; // Updated import path

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
      <Providers session={session}>

          <Navbar />
          <Toaster />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
