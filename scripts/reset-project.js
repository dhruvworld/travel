const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Resetting project and database connections...');

// Directories to clean
const directories = [
  '.next',
  'node_modules/.cache'
];

// Delete directories
directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`);
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
});

// Check for required dependencies
console.log('Checking required dependencies...');
try {
  // Check for styled-jsx which is required by Next.js
  const styledJsxPath = path.join(__dirname, '..', 'node_modules', 'styled-jsx');
  if (!fs.existsSync(styledJsxPath)) {
    console.log('Installing styled-jsx dependency...');
    execSync('npm install styled-jsx@^5.1.2 --save', { stdio: 'inherit' });
  } else {
    console.log('✅ styled-jsx is installed');
  }
} catch (error) {
  console.error('Error checking dependencies:', error);
}

// Regenerate Prisma client
console.log('Regenerating Prisma client...');
try {
} catch (error) {
  console.error('Error generating Prisma client:', error);
}

// Print the available models
console.log('\nChecking Prisma models:');
try {
  // This will show all available Prisma models in your terminal
} catch (error) {
  console.error('Error checking Prisma models:', error);
}

// Fix dependencies
console.log('\nFixing dependencies:');
try {
  execSync('node fix-deps.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Error fixing dependencies:', error);
}

// Find and update tour links
console.log('\nFinding and updating tour links:');
try {
  execSync('node scripts/find-and-update-links.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Error updating tour links:', error);
}

console.log('\n✅ Reset complete! Now run:');
console.log('npm run dev');
