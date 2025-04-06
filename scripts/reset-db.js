const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Resetting database connection...');

// Clean Next.js cache
console.log('Cleaning Next.js cache...');
const nextCacheDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextCacheDir)) {
  fs.rmSync(nextCacheDir, { recursive: true, force: true });
  console.log('✅ Next.js cache cleared');
}

// Regenerate Prisma client
console.log('\nRegenerating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client regenerated');
} catch (error) {
  console.error('❌ Error regenerating Prisma client:', error);
}

// Check database connection
console.log('\nChecking database connection...');
try {
  execSync('node scripts/check-db.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error checking database:', error);
}

console.log('\n🔄 Reset complete. You can now run:');
console.log('npm run dev');
