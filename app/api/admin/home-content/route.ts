import { NextRequest, NextResponse } from 'next/server';
import { getHomeContent, updateHomeContent } from '@/lib/services/firebase-home';
import { verifyAdmin } from '@/lib/utils/verify-admin';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

const ensureUploadsDir = async () => {
  const uploadsDir = process.env.UPLOAD_PATH || join(process.cwd(), 'public/hero');
  try {
    await mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating uploads directory:', error);
  }
};

export async function GET() {
  const content = await getHomeContent();
  return NextResponse.json(
    content ?? {
      title: 'Explore Beautiful India',
      subtitle: 'Discover the beauty and culture of incredible India',
      heroText: 'Your journey begins here',
      heroImage: '/images/hero-default.jpg'
    }
  );
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureUploadsDir();
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const heroText = formData.get('heroText') as string;

    let heroImage = formData.get('heroImageUrl') as string || '';
    const heroImageFile = formData.get('heroImage') as File;

    if (heroImageFile && heroImageFile.size > 0) {
      const ext = heroImageFile.name.split('.').pop();
      const fileName = `hero-${uuid()}.${ext}`;
      const uploadsDir = process.env.UPLOAD_PATH || join(process.cwd(), 'public/hero');
      const filePath = join(uploadsDir, fileName);
      const arrayBuffer = await heroImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(filePath, new Uint8Array(buffer));

      heroImage = `/hero/${fileName}`;
    }

    const updated = await updateHomeContent({ title, subtitle, heroText, heroImage });
    return NextResponse.json({ ...updated, message: 'Home content updated successfully' });
  } catch (error) {
    console.error('Error updating home content:', error);
    return NextResponse.json({ error: 'Failed to update home content' }, { status: 500 });
  }
}
