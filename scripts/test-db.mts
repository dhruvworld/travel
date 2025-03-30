import { PrismaClient } from '@prisma/client';

// Enable detailed Prisma logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Catch unhandled promises
process.on('unhandledRejection', (reason) => {
  console.error("💥 Unhandled Promise Rejection:");
  console.error(reason);
  process.exit(1);
});

async function main() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection established');

    // Create test user with proper error handling
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        role: "user"
      }
    });
    console.log('✅ Test user created:', user);

    // Verify user was created
    const users = await prisma.user.findMany();
    console.log('📊 Total users:', users.length);

  } catch (error) {
    console.error('❌ Error in main():', error);
    throw error;
  }
}

// Proper promise chain with cleanup
main()
  .catch((error) => {
    console.error('🔥 Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    console.log('🔌 Closing database connection...');
    await prisma.$disconnect();
  });
