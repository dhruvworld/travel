// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string; // 👈 add role
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string; // 👈 extend User with role
  }
}
