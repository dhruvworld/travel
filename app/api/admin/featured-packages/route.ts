import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { yourFn } from '@/lib/services/firebase-package'; // Use alias

import { getAllPackages, toggleFeatured } from '@/lib/services/firebase-package';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authHeader = (await headers()).get('authorization');
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const featuredPackages = await getAllPackages(true); // only featured
    return NextResponse.json(featuredPackages);
  } catch (error) {
    console.error('Admin GET featured-packages error:', error);
    return NextResponse.json({ error: 'Failed to fetch featured packages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authHeader = (await headers()).get('authorization');
  const { adminKey, id, featured } = await req.json();

  if (
    (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) &&
    adminKey !== process.env.ADMIN_API_KEY
  ) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await toggleFeatured(id, featured);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Admin POST featured-packages error:', error);
    return NextResponse.json({ error: 'Failed to update featured status' }, { status: 500 });
  }
}
