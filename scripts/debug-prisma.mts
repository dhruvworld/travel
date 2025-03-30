import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

console.log("🔍 Available Prisma models:");
console.log(Object.keys(prisma));

await prisma.$disconnect();
