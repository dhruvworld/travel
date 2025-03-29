// app/types/next-auth.d.ts
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Make id required
      role?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface User {
    id: string;
    role?: string | null;
  }

  interface JWT {
    id?: string;
    role?: string | null;
  }
}
