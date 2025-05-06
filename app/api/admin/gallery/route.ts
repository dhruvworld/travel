import { NextRequest, NextResponse } from 'next/server';
import { addGalleryImage, deleteGalleryImage } from '@/lib/services/firebase-gallery';
import { verifyAdmin } from '@/lib/utils/verify-admin';


export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = await addGalleryImage(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Add gallery image error:', error);
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    await deleteGalleryImage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
