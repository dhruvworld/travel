const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to clean
const directories = [
  '.next',
  'node_modules/.cache'
];

console.log('🧹 Cleaning up Next.js project...');

// Delete directories
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`);
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
});

// Run yarn/npm install
console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
} catch (error) {
  console.error('Error installing dependencies:', error);
  process.exit(1);
}

console.log('✅ Cleanup complete! Now run:');
console.log('npm run dev');
