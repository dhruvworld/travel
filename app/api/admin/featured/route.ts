import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { setFeaturedPackages, getFeaturedPackages } from '@/lib/prisma/packages';

export async function POST(request: Request) {
  const session = await getServerSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { ids } = await request.json();
    
    if (!Array.isArray(ids) || ids.length > 3) {
      return NextResponse.json(
        { error: 'Invalid input. Maximum 3 featured packages allowed.' },
        { status: 400 }
      );
    }

    await setFeaturedPackages(ids);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update featured packages' },
      { status: 500 }
    );
  }
}
