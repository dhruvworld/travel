import { PrismaClient } from '@prisma/client';

// Extend the PrismaClient type to allow dynamic key access
declare module '@prisma/client' {
  interface PrismaClient {
    [key: string]: any;
  }
}
