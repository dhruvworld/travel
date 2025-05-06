// lib/firebase/auth-check.ts
import { getAuth } from 'firebase/auth';
import { app } from './firebase/firebase'; // your initialized firebase app

const auth = getAuth(app);

export async function isUserAdmin(user: any): Promise<boolean> {
  if (!user) return false;

  const token = await user.getIdTokenResult(true);
  return token?.claims?.isAdmin === true;
}
