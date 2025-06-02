const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Starting server debugging...');

// Check environment variables
console.log('\n📋 Environment variables:');
const envVars = [
  'DATABASE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'NODE_ENV'
];

envVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`${varName}: ${value ? '✓ Set' : '✗ Not set'}`);
});

// Check Prisma connection
console.log('\n🔌 Testing Prisma connection...');
try {
  execSync('npx prisma validate', { stdio: 'inherit' });
  console.log('✓ Prisma schema is valid');
  
  console.log('\nGenerating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✓ Prisma client generated');
} catch (error) {
  console.error('❌ Prisma error:', error.message);
}

// Start Next.js in development mode with detailed logs
console.log('\n🚀 Starting Next.js with detailed logging...');
try {
  execSync('NODE_OPTIONS=--trace-warnings next dev', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      DEBUG: '*',
      NEXT_TELEMETRY_DISABLED: '1'
    }
  });
} catch (error) {
  console.error('❌ Next.js error:', error.message);
}
