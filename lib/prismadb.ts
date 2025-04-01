import { PrismaClient } from '@prisma/client';

// Use a global variable to prevent multiple instances in development
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a singleton Prisma client
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query'],
});

// Only assign in development to prevent hot reloading issues
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
