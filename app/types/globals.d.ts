import { DefaultSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

declare global {
  // For Prisma Client
  var prisma: PrismaClient | undefined;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string | null;
    } & DefaultSession['user']
  }

  interface JWT {
    role?: string | null;
  }

  interface User {
    id: string;
    role?: string | null;
  }
}
