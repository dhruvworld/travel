// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './app/providers';

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
  const session = await getServerSession(authOptions);

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
