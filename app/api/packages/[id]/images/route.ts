import { db } from '@/lib/firebase-client';
import { doc, updateDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { images } = await req.json();
  await updateDoc(doc(db, "packages", params.id), { images });
  return new Response("Updated", { status: 200 });
}
