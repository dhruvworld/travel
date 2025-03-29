import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    const result = await prisma.customTour.create({
      data: formData
    });

    return NextResponse.json({ success: true, tour: result });
  } catch (err) {
    console.error('Custom tour creation failed:', err);
    return NextResponse.json(
      { error: 'Failed to create custom tour' },
      { status: 500 }
    );
  }
}
