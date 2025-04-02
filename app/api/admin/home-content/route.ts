import { NextRequest, NextResponse } from 'next/server';
import { getHomeContent, updateHomeContent } from '@/lib/services/home-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

// Ensure the uploads directory exists
async function ensureUploadsDir() {
  const uploadsDir = process.env.UPLOAD_PATH || join(process.cwd(), 'public/hero');
  try {
    await mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating uploads directory:', error);
  }
}

export async function GET() {
  const content = await getHomeContent();
  
  if (!content) {
    // Return default values if no content exists yet
    return NextResponse.json({
      title: 'Explore Beautiful India',
      subtitle: 'Discover the beauty and culture of incredible India',
      heroText: 'Your journey begins here',
      heroImage: '/images/hero-default.jpg'
    });
  }
  
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    await ensureUploadsDir();
    
    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const heroText = formData.get('heroText') as string;
    
    // Extract hero image from form data
    let heroImage = formData.get('heroImageUrl') as string || '';
    const heroImageFile = formData.get('heroImage') as File;
    
    // If a new image was uploaded, save it to the server
    if (heroImageFile && heroImageFile.size > 0) {
      const fileExtension = heroImageFile.name.split('.').pop();
      const fileName = `hero-${uuid()}.${fileExtension}`;
      
      // Use the UPLOAD_PATH environment variable
      const uploadsDir = process.env.UPLOAD_PATH || join(process.cwd(), 'public/hero');
      const filePath = join(uploadsDir, fileName);
      
      const buffer = Buffer.from(await heroImageFile.arrayBuffer());
      await writeFile(filePath, buffer);
      
      // Update the hero image URL - note that the URL is relative to the public directory
      heroImage = `/hero/${fileName}`;
    }
    
    // Update home content in the database
    const updated = await updateHomeContent({
      title,
      subtitle,
      heroText,
      heroImage
    });
    
    return NextResponse.json({
      ...updated,
      message: 'Home content updated successfully'
    });
  } catch (error) {
    console.error('Error updating home content:', error);
    return NextResponse.json(
      { error: 'Failed to update home content' }, 
      { status: 500 }
    );
  }
}
