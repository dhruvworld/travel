// app/api/car-rental/route.ts
import { db } from '@/lib/firebase-client';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Fetch all cars
export async function GET() {
  const carsRef = collection(db, "cars");
  const snapshot = await getDocs(carsRef);
  const cars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return NextResponse.json(cars);
}

// Add a new car rental option (no ID dependency)
export async function POST(req: Request) {
  const data = await req.json();
  const carsRef = collection(db, "cars");
  await addDoc(carsRef, data);

  return NextResponse.json({ message: "Car rental added successfully" });
}
