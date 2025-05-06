import { NextRequest, NextResponse } from 'next/server';
import { addOffer, deleteOffer } from '@/lib/services/firebase-offer';
import { verifyAdmin } from '@/lib/utils/verify-admin';


export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = await addOffer(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Add offer error:', error);
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    await deleteOffer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete offer error:', error);
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
  }
}
