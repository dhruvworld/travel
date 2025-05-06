import { toggleFeatured } from '@/lib/services/firebase-package';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { featured } = await req.json();
  await toggleFeatured(params.id, featured);
  return new Response("Toggled", { status: 200 });
}
