import type { NextAuthOptions } from "next-auth";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your credential validation logic here
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    // You can also define `jwt`, `signIn`, etc. if needed
  },
};
