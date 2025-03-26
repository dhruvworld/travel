import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shuham Tours & Travels - Discover the Magic of India',
  description: 'Experience the best of India with Shuham Tours & Travels. We offer curated tours, comfortable accommodations, and unforgettable experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
