import { NextRequest, NextResponse } from 'next/server';
import { deleteOffer } from '@/lib/services/firebase-offer';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: 'Offer ID is required' }, { status: 400 });
  }

  try {
    await deleteOffer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
  }
}
