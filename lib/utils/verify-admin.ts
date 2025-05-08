// lib/utils/verify-admin.ts
import { adminAuth } from '@/lib/firebase-admin';

export async function verifyAdmin(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Missing Authorization header");
  }

  const token = authHeader.replace("Bearer ", "");
  if (!adminAuth) {
    throw new Error("Firebase Admin is not initialized.");
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.admin === true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}
