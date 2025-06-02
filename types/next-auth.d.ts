<<<<<<< HEAD
// types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface User {
    isAdmin?: boolean;
  }

  interface Session {
    user: {
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
=======
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string | null;
      isAdmin?: boolean;
    } & DefaultSession['user']
  }

  interface User {
    id: string;
    role?: string;
    isAdmin?: boolean;
  }
}

// Extend JWT type to include custom fields
declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    isAdmin?: boolean;
  }
}
