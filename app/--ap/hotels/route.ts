// app/api/hotels/route.ts
import { db } from '@/lib/firebase-client';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Fetch all hotels
export async function GET() {
  const hotelsRef = collection(db, "hotels");
  const snapshot = await getDocs(hotelsRef);
  const hotels = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return NextResponse.json(hotels);
}

// Add a new hotel (no ID dependency)
export async function POST(req: Request) {
  const data = await req.json();
  const hotelsRef = collection(db, "hotels");
  await addDoc(hotelsRef, data);

  return NextResponse.json({ message: "Hotel added successfully" });
}
