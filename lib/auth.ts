// lib/auth.ts

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth-options'

export async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const isAdmin = (session?.user as any)?.isAdmin

  if (!session || !isAdmin) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
