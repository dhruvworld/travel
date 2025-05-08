// app/api/testimonials/route.ts
import { db } from '@/lib/firebase-client';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Fetch all testimonials
export async function GET() {
  const testimonialsRef = collection(db, "testimonials");
  const snapshot = await getDocs(testimonialsRef);
  const testimonials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return NextResponse.json(testimonials);
}

// Add a new testimonial (no ID dependency)
export async function POST(req: Request) {
  const data = await req.json();
  const testimonialsRef = collection(db, "testimonials");
  await addDoc(testimonialsRef, data);

  return NextResponse.json({ message: "Testimonial added successfully" });
}
