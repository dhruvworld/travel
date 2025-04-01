import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    reset: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 20;

export async function rateLimit(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';
  const now = Date.now();
  
  if (store[ip] && now < store[ip].reset) {
    store[ip].count++;
    if (store[ip].count > MAX_REQUESTS) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  } else {
    store[ip] = {
      count: 1,
      reset: now + WINDOW_SIZE,
    };
  }
  
  return null;
}
