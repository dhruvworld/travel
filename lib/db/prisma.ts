import { PrismaClient } from '@prisma/client';

// Global type for Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a singleton Prisma client
const prisma = globalThis.prisma || 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
