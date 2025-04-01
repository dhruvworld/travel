import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { getFeaturedPackages, updateFeaturedStatus, setFeaturedPackages } from '@/lib/prisma/packages';
import { requireAuth, auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const rateLimited = await rateLimit(req);
    if (rateLimited) return rateLimited;

    await requireAuth();
    const packages = await getFeaturedPackages();
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const rateLimitResponse = await rateLimit(request);
  if (rateLimitResponse?.status === 429) return rateLimitResponse;

  const headers = new Headers(rateLimitResponse?.headers);

  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return new Response('Unauthorized', { status: 401, headers });
  }

  const { packageIds } = await request.json();

  if (!packageIds || packageIds.length > 3) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers }
    );
  }

  await setFeaturedPackages(packageIds);
  return NextResponse.json({ success: true }, { headers });
}
