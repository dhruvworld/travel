// Import the prisma client directly from db/prisma
import prismaClient from '../db/prisma';

// Export it with both named and default exports
export const prisma = prismaClient;
export default prismaClient;
