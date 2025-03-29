import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { CustomTour } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const tourData: Partial<CustomTour> = await request.json();
    const tour = await prisma.customTour.create({
      data: tourData as CustomTour,
    });
    return NextResponse.json({ success: true, tour });
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create tour' },
      { status: 500 }
    );
  }
}