const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Delete the current prisma client
console.log('Cleaning up existing Prisma client...');
try {
  if (fs.existsSync(path.join(__dirname, '../node_modules/.prisma'))) {
    fs.rmSync(path.join(__dirname, '../node_modules/.prisma'), { recursive: true, force: true });
    console.log('Removed .prisma directory');
  }
  
  if (fs.existsSync(path.join(__dirname, '../node_modules/@prisma/client'))) {
    fs.rmSync(path.join(__dirname, '../node_modules/@prisma/client'), { recursive: true, force: true });
    console.log('Removed @prisma/client directory');
  }
} catch (error) {
  console.error('Error during cleanup:', error);
}

// Regenerate the prisma client
console.log('Regenerating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client successfully regenerated');
} catch (error) {
  console.error('Error regenerating Prisma client:', error);
}
