<<<<<<< HEAD
export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/auth-options";
import { Session } from "next-auth";
=======
// lib/session.ts

import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'     // ← fixed path
import { Session } from 'next-auth'
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27

/**
 * Helper to get the session with error handling
 */
export async function getSession(): Promise<Session | null> {
  try {
<<<<<<< HEAD
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
=======
    return await getServerSession(authOptions)
  } catch (error) {
    console.error('Error getting session:', error)
    return null
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
  }
}

/**
 * Check if the session exists without throwing
 */
export async function checkSession(): Promise<boolean> {
<<<<<<< HEAD
  const session = await getSession();
  return session !== null;
=======
  const session = await getSession()
  return session !== null
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
}

/**
 * Get the user ID from the session
 */
export async function getUserId(): Promise<string | null> {
<<<<<<< HEAD
  const session = await getSession();
  return session?.user?.id || null;
=======
  const session = await getSession()
  return session?.user?.id || null
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
}
