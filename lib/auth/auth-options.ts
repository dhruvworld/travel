import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials || credentials.username !== adminUsername) {
          return null;
        }

        // For development, directly compare with plaintext password
        // In production, you should use the hashed password approach
        if (credentials.password === adminPassword) {
          return {
            id: "admin",
            name: "Admin",
            email: process.env.ADMIN_EMAIL || "jamesbond@007.com",
            isAdmin: true, // ✅ required in token/session
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Copy user properties to token
        token.isAdmin = user.isAdmin === true;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Make isAdmin available in the session
        session.user.isAdmin = token.isAdmin === true;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
};




