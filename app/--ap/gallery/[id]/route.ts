// app/api/gallery/route.ts
import { db } from '@/lib/firebase-client';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Fetch all gallery images
export async function GET() {
  const galleryRef = collection(db, "gallery");
  const snapshot = await getDocs(galleryRef);
  const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return NextResponse.json(images);
}

// Add a new gallery image (no ID dependency)
export async function POST(req: Request) {
  const data = await req.json();
  const galleryRef = collection(db, "gallery");
  await addDoc(galleryRef, data);

  return NextResponse.json({ message: "Image added to gallery" });
}
