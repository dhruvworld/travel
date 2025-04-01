import { getServerSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma'; // ✅ Fixed import
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { redirect } from 'next/navigation';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string | null;
      }
      return session;
    },
  },
};

// Export helpers
export const getSession = () => getServerSession(authOptions);

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/api/auth/signin');
  }
  return session;
}

export async function checkAuth() {
  return await getSession();
}

export const auth = { getSession, requireAuth, checkAuth };
