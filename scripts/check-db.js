const { PrismaClient } = require('@prisma/client');

async function inspectDatabase() {
  console.log('🔍 Inspecting database...');
  
  try {
    // Create a Prisma client with full logging
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });

    // Try a simple connection test
    try {
      console.log('Testing database connection...');
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Database connection successful');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      console.log('\n📢 Please make sure your database is running and DATABASE_URL is correct in .env');
      await prisma.$disconnect();
      return;
    }

    // List all available models
    console.log('\nAvailable models:');
    const models = Object.keys(prisma).filter(key => 
      !key.startsWith('_') && typeof prisma[key] === 'object'
    );
    
    if (models.length === 0) {
      console.log('❌ No models found! Make sure your schema.prisma is correctly defined.');
    } else {
      models.forEach(model => {
        console.log(`- ${model}`);
      });
    }

    // Check for specific models
    console.log('\nChecking for required models:');
    ['package', 'tourPackage', 'User', 'Admin'].forEach(model => {
      if (models.includes(model)) {
        console.log(`✅ '${model}' model exists`);
        
        // For package/tourPackage models, check if they contain data
        if (model === 'package' || model === 'tourPackage') {
          prisma[model].count().then(count => {
            console.log(`   Found ${count} records in ${model}`);
          }).catch(err => {
            console.log(`   Error counting records in ${model}:`, err);
          });
        }
      } else {
        console.log(`❌ '${model}' model NOT found`);
      }
    });
    
    // Wait a moment to allow the count queries to complete
    setTimeout(async () => {
      await prisma.$disconnect();
      console.log('\n🔍 Inspection complete');
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error during inspection:', error);
  }
}

inspectDatabase();
