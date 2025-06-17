// lib/session.ts

import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'     // ← fixed path
import { Session } from 'next-auth'
/**
 * Helper to get the session with error handling
 */
export async function getSession(): Promise<Session | null> {
  try {
return await getServerSession(authOptions)
  } catch (error) {
    console.error('Error getting session:', error)
    return null
}
}

/**
 * Check if the session exists without throwing
 */
export async function checkSession(): Promise<boolean> {
const session = await getSession()
  return session !== null
}

/**
 * Get the user ID from the session
 */
export async function getUserId(): Promise<string | null> {
const session = await getSession()
  return session?.user?.id || null
}
