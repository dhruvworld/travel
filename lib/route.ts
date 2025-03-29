import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
