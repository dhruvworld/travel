// lib/firebase-admin-auth.ts
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { NextRequest } from 'next/server';

initializeApp({
  credential: applicationDefault()
});

export async function verifyFirebaseAdmin(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = await getAuth().verifyIdToken(token);
    return decoded.admin === true; // assumes custom claim 'admin' is set
  } catch (err) {
    console.error('Auth error:', err);
    return false;
  }
}
