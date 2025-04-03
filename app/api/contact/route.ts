import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// Type for contact form data
interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // You can uncomment this when the inquiry table is added to your Prisma schema
    /*
    // Store the inquiry in the database
    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        status: 'NEW'
      }
    });
    */
    
    // For now, just log the inquiry
    console.log('Received contact form submission:', data);
    
    // Here you could add email notification logic using a service like Nodemailer, SendGrid, etc.
    
    return NextResponse.json({ 
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
