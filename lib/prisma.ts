// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use type for global variable to ensure TypeScript recognizes it
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Define global variable for prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Use existing prisma instance if available, or create a new one
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Set the global prisma instance in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
