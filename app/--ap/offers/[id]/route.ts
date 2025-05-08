// app/api/offers/route.ts
import { db } from '@/lib/firebase-client';
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  const offersRef = collection(db, "offers");
  const snapshot = await getDocs(offersRef);
  const offers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return NextResponse.json(offers);
}

export async function POST(req: Request) {
  const data = await req.json();
  const offersRef = collection(db, "offers");
  await addDoc(offersRef, data);

  return NextResponse.json({ message: "Offer added successfully" });
}

export async function DELETE(req: Request) {
  const data = await req.json();
  const offerRef = doc(db, "offers", data.id);
  await deleteDoc(offerRef);

  return NextResponse.json({ message: "Offer deleted successfully" });
}
