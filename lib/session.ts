export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";

/**
 * Get the current user session with error handling
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
 * Require authentication or redirect to sign in
 * @param redirectTo - where to redirect after sign in (defaults to current path)
 */
export async function requireAuth(redirectTo?: string): Promise<Session> {
  const session = await getSession();
  
  if (!session) {
    const callbackUrl = redirectTo || '/dashboard';
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  
  return session;
}

/**
 * Check if a user is authenticated without redirecting
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}
