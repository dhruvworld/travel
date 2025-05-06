
// Enable detailed Prisma logging
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
    console.log('✅ Database connection successful');
    console.log('Result:', result);

    // Check available models

    // Test database connection
    console.log('✅ Database connection established');

    // Create test user with proper error handling
      data: {
        name: "Test User",
        email: "test@example.com",
        role: "user"
      }
    });
    console.log('✅ Test user created:', user);

    // Verify user was created
    console.log('📊 Total users:', users.length);

    return true;
  } catch (error) {
    console.error('❌ Error in main():', error);
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    console.log('🔌 Closing database connection...');
  }
}

// Proper promise chain with cleanup
main().then(success => {
  process.exit(success ? 0 : 1);
});
