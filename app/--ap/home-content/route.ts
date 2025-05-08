// app/api/home-content/route.ts
import { db } from '@/lib/firebase-client';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Fetch home content
export async function GET() {
  const homeDocRef = doc(db, "home-content", "main");
  const snapshot = await getDoc(homeDocRef);
  const homeContent = snapshot.exists() ? snapshot.data() : {};
  
  return NextResponse.json(homeContent);
}

// Update home content
export async function POST(req: Request) {
  const data = await req.json();
  const homeDocRef = doc(db, "home-content", "main");
  await setDoc(homeDocRef, data, { merge: true });

  return NextResponse.json({ message: "Home content updated successfully" });
}
