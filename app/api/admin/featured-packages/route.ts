// app/api/admin/featured-packages/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

// ✅ Force dynamic rendering to avoid static generation errors
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const headerList = headers(); // Access request headers
    const authHeader = headerList.get('authorization');

    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if prisma is properly initialized
    if (!prisma) {
      console.error('[API /admin/featured-packages] Prisma client not initialized');
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }

    try {
      const featuredPackages = await prisma.tourPackage.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' },
      });
      
      return NextResponse.json(featuredPackages);
    } catch (dbError) {
      console.error('[API /admin/featured-packages] Database error:', dbError);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('[API /admin/featured-packages] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
