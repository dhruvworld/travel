<<<<<<< HEAD
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/auth-options';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { AUTH_CONFIG } from './auth.config';

// Export the authOptions for convenience
export { authOptions };

/**
 * Helper to get the session with better error handling
 */
export async function getSession(): Promise<Session | null> {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Get admin session or redirect to login
 */
export async function getAdminSession() {
  const session = await getSession();
  
  if (!session?.user?.isAdmin) {
    redirect(AUTH_CONFIG.ADMIN_LOGIN_ROUTE);
  }
  
  return session;
}

/**
 * Require authentication or redirect
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect(`${AUTH_CONFIG.LOGIN_ROUTE}?callbackUrl=/dashboard`);
  }
  return session;
}

/**
 * Check if user is authenticated without throwing
 */
export async function checkAuth() {
  return await getSession();
}

export const auth = { getSession, requireAuth, checkAuth, getAdminSession };
=======
// lib/auth.ts

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth-options'

export async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const isAdmin = (session?.user as any)?.isAdmin

  if (!session || !isAdmin) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
