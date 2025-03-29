import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';

const customTourSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  destinations: z.string(),
  numTravelers: z.string().or(z.number()).transform(val => Number(val)),
  travelOnly: z.boolean().optional().default(false),
  preferences: z.string().optional(),
  startDate: z.string().or(z.date()).transform(val => new Date(val)),
  endDate: z.string().or(z.date()).transform(val => new Date(val))
});

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    const data = customTourSchema.parse(rawData);
    
    const tour = await prisma.customTour.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        destinations: data.destinations,
        numTravelers: data.numTravelers,
        travelOnly: data.travelOnly,
        preferences: data.preferences,
        startDate: data.startDate,
        endDate: data.endDate
      }
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