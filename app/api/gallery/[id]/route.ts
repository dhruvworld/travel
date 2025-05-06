import { db } from '@/lib/firebase-client';
import { doc, deleteDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await deleteDoc(doc(db, "gallery", params.id));
  return new Response("Deleted", { status: 200 });
}
