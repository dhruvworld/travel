<<<<<<< HEAD
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma"; 
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    // Only keep the CredentialsProvider
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Get admin credentials from environment
          const adminUsername = process.env.ADMIN_USERNAME;
          const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

          // Check if username matches
          if (credentials.username !== adminUsername) {
            console.log("Username does not match admin username");
            return null;
          }

          // Verify password
          const passwordValid = await bcrypt.compare(
            credentials.password,
            adminPasswordHash!
          );

          if (!passwordValid) {
            console.log("Invalid password");
            return null;
          }

          // Return admin user
          return {
            id: "admin",
            name: "Admin",
            email: "admin@example.com",
            isAdmin: true,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      // Add admin flag to session if present in token
      if (session.user && token.isAdmin) {
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      
      return session;
    },
    async jwt({ token, user }) {
      // Persist the isAdmin flag to the token
      if (user?.isAdmin) {
        token.isAdmin = true;
      }
      
      if (user) {
        token.id = user.id;
      }
      
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Redirect admin to dashboard after login
      if (url.startsWith("/api/auth/signin") || url === "/") {
        return `${baseUrl}/admin/dashboard`;
      }
      
      // Allow relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      
      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      
      return baseUrl;
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/auth/error',
  },
};
=======
// lib/auth-options.ts

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Guard against undefined credentials
        const username = credentials?.username
        const password = credentials?.password

        if (
          username === process.env.ADMIN_USERNAME &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: 'admin',
            name: username,
            email: process.env.ADMIN_EMAIL,
            isAdmin: true,
          }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = (user as any).isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
}
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
