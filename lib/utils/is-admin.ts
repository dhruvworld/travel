// lib/utils/is-admin.ts
import { getIdTokenResult, User } from 'firebase/auth';

export async function isAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;

  const tokenResult = await getIdTokenResult(user);
  return !!tokenResult.claims.admin;
}
