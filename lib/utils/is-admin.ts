// lib/utils/is-admin.ts

/**
 * Returns true if the current user is an admin.
 * In this example we simply check a stored token in localStorage,
 * but you can replace this logic with a call to Firebase Auth or your API.
 */
export async function isAdmin(): Promise<boolean> {
  if (typeof window === 'undefined') {
    // never an admin on server
    return false
  }

  const token = localStorage.getItem('adminToken')
  // compare against a value you’ve set in your .env and exposed via NEXT_PUBLIC_*
  return token === process.env.NEXT_PUBLIC_ADMIN_TOKEN
}
