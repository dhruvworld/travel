import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth-options';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';

// Export the authOptions for convenience
export { authOptions };

// Helper to get the session with better error handling
export async function getSession(): Promise<Session | null> {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

// Require authentication or redirect
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard');
  }
  return session;
}

// Check if user is authenticated without throwing
export async function checkAuth() {
  return await getSession();
}

export const auth = { getSession, requireAuth, checkAuth };
