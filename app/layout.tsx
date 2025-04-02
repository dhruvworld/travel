import { Providers } from '@/app/providers';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Travel Agency - Explore India',
  description: 'Discover the beauty of India with our curated travel packages',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
