import type { NextAuthOptions } from "next-auth";

import Google from "next-auth/providers/google";

/**
 * Authentication configuration constants
 */

export const AUTH_CONFIG = {
  // Session durations
  SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 days in seconds
  
  // Cookie settings
  COOKIE_NAME: "next-auth.session-token",
  COOKIE_OPTIONS: {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  },
  
  // Password settings
  PASSWORD_MIN_LENGTH: 8,
  
  // Rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_TIME: 15 * 60, // 15 minutes in seconds
  
  // Routes
  LOGIN_ROUTE: "/auth/signin",
  ADMIN_LOGIN_ROUTE: "/admin/login",
  ADMIN_DASHBOARD_ROUTE: "/admin/dashboard",
  
  // Roles
  ROLES: {
    ADMIN: "ADMIN",
    USER: "USER",
  }
};

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Ensure isAdmin is a boolean
        token.isAdmin = Boolean(user.isAdmin);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        // Ensure isAdmin is properly typed as boolean
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
};
