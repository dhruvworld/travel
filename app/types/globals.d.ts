import { DefaultSession } from 'next-auth';
<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27

declare global {
  // For Prisma Client
  var prisma: PrismaClient | undefined;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string | null;
<<<<<<< HEAD
=======
      isAdmin?: boolean;
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    } & DefaultSession['user']
  }

  interface JWT {
    role?: string | null;
<<<<<<< HEAD
=======
    isAdmin?: boolean;
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
  }

  interface User {
    id: string;
    role?: string | null;
<<<<<<< HEAD
=======
    isAdmin?: boolean; 
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
  }
}
