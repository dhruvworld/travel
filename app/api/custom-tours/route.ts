import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ✅ Correct!


import { z } from 'zod';

const customTourSchema = z.object({
  fullName: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
  destinations: z.string(),
  numTravelers: z.string().or(z.number()).transform(val => Number(val)),
  travelOnly: z.boolean().optional().default(false),
  preferences: z.string().optional().default(""),
  startDate: z.string().or(z.date()).transform(val => new Date(val)),
  endDate: z.string().or(z.date()).transform(val => new Date(val))
});

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    const data = customTourSchema.parse(rawData);
    
    // Include destinations in the message field since it's not in the schema
    const enhancedMessage = `Destinations: ${data.destinations}\n\n${data.message}`;
    
    const tour = await prisma.customTour.create({
      data: {
        fullName: data.fullName,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: enhancedMessage,
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