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
isAdmin?: boolean;
  }
}
