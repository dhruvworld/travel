// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  if (!globalThis.prisma) {
    console.log('Creating new Prisma client instance');
  }
  globalThis.prisma = prisma;
}

export default prisma; // ✅ Default export
