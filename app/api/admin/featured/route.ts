import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { packageIds, featured } = await request.json();
    
    if (!packageIds || !Array.isArray(packageIds)) {
      return NextResponse.json(
        { error: 'Invalid request: packageIds must be an array' },
        { status: 400 }
      );
    }

    const updatePromises = packageIds.map(id => 
      prisma.tourPackage.update({
        where: { id },
        data: { featured: featured === true }
      })
    );
    
    await Promise.all(updatePromises);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating featured packages:', error);
    return NextResponse.json(
      { error: 'Failed to update featured packages' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const featuredPackages = await prisma.tourPackage.findMany({
      where: { featured: true },
      select: { id: true, name: true, image: true, featured: true }
    });
    
    return NextResponse.json(featuredPackages);
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured packages' },
      { status: 500 }
    );
  }
}
