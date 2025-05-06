import { DefaultSession } from 'next-auth';

declare global {
  // For Prisma Client
  var prisma: PrismaClient | undefined;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string | null;
      isAdmin?: boolean;
    } & DefaultSession['user']
  }

  interface JWT {
    role?: string | null;
    isAdmin?: boolean;
  }

  interface User {
    id: string;
    role?: string | null;
    isAdmin?: boolean; 
  }
}
