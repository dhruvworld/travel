// lib/auth.ts
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getServerSession } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma'; // Fixed: changed from named to default import

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // ✅ PASS prisma here
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add more providers here
  ],
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export const auth = () => getServerSession(authOptions);
