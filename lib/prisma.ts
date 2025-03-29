// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Add prisma to the globalThis type
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Create and export the singleton instance as a named export
export const prisma = globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
