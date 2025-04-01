import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    // Test connection with a simple query
    const result = await prisma.$queryRaw`SELECT 1+1 AS result`;
    console.log('✅ Database connection successful');
    console.log('Available models:', Object.keys(prisma));
    
    // Check for User model
    const userCount = await prisma.user.count();
    console.log(`User table exists with ${userCount} records`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

main().then(result => {
  if (!result) process.exit(1);
});
