import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './prisma';

export async function POST(request: NextRequest) {
  try {
    const result = await prisma.customTour.create({
      data: await request.json()
    });
    return NextResponse.json({ success: true, tour: result });
  } catch (err) {
    console.error('Failed to create tour:', err);
    return NextResponse.json(
      { message: 'Failed to create tour' },
      { status: 500 }
    );
  }
}
