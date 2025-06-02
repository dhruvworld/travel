<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';

// Enable detailed Prisma logging
const prisma = new PrismaClient({
=======

// Enable detailed Prisma logging
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
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
    // Attempt a simple query
<<<<<<< HEAD
    const result = await prisma.$queryRaw`SELECT 1 as test`
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    console.log('✅ Database connection successful');
    console.log('Result:', result);

    // Check available models
<<<<<<< HEAD
    console.log('Available models:', Object.keys(prisma).filter(key => !key.startsWith('_')));

    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection established');

    // Create test user with proper error handling
    const user = await prisma.user.create({
=======

    // Test database connection
    console.log('✅ Database connection established');

    // Create test user with proper error handling
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
      data: {
        name: "Test User",
        email: "test@example.com",
        role: "user"
      }
    });
    console.log('✅ Test user created:', user);

    // Verify user was created
<<<<<<< HEAD
    const users = await prisma.user.findMany();
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    console.log('📊 Total users:', users.length);

    return true;
  } catch (error) {
    console.error('❌ Error in main():', error);
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    console.log('🔌 Closing database connection...');
<<<<<<< HEAD
    await prisma.$disconnect();
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
  }
}

// Proper promise chain with cleanup
main().then(success => {
  process.exit(success ? 0 : 1);
});
