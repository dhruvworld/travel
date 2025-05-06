import { getAllTestimonials, addTestimonial, deleteTestimonial } from '@/lib/services/firebase-testimonial';
import { NextRequest } from 'next/server';

export async function GET() {
  const data = await getAllTestimonials();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = await addTestimonial(body);
  return Response.json({ id });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteTestimonial(id);
  return new Response("Deleted", { status: 200 });
}
