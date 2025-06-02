
async function checkPrismaModels() {
  console.log('🔍 Checking Prisma models and connection...');
  
  try {
    // Create a new Prisma client instance
      log: ['query', 'info', 'warn', 'error'],
    });
    
    // Check connection by executing a simple query
    console.log('Checking database connection...');
    console.log('✅ Database connection successful');
    
    // List all available models
    console.log('\nAvailable models in your Prisma client:');
    );
    
    models.forEach(model => {
      console.log(`- ${model}`);
    });
    
    // Check if the required models exist
    const requiredModels = ['package', 'tourPackage'];
    console.log('\nChecking required models:');
    requiredModels.forEach(model => {
      if (models.includes(model)) {
        console.log(`✅ '${model}' model exists`);
      } else {
        console.log(`❌ '${model}' model NOT found`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error occurred:', error);
  }
}

checkPrismaModels();
