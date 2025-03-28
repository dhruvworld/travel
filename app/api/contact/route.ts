import { NextResponse } from 'next/server';
import type { ContactFormData } from '@/types/contact';

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    
    // TODO: Add your logic here to:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Integrate with CRM if needed
    
    console.log('Form submission received:', data);
    
    return NextResponse.json({ 
      success: true,
      message: data.type === 'trip' ? 
        'Thank you for your interest! We will contact you soon with trip details.' :
        'Thank you for your message! We will get back to you shortly.'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
