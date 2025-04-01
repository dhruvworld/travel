import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';

// Export authOptions for use in other files
export { authOptions };

// Export helpers
export async function getSession(): Promise<Session | null> {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard');
  }
  return session;
}

export async function checkAuth() {
  return await getSession();
}

export const auth = { getSession, requireAuth, checkAuth };
