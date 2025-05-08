// app/api/packages/route.ts
import { db } from '@/lib/firebase-client';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Fetch all packages
export async function GET() {
  const packagesRef = collection(db, "packages");
  const snapshot = await getDocs(packagesRef);
  const packages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return NextResponse.json(packages);
}

// Add a new package (no ID dependency)
export async function POST(req: Request) {
  const data = await req.json();
  const packagesRef = collection(db, "packages");
  await addDoc(packagesRef, data);

  return NextResponse.json({ message: "Package added successfully" });
}
