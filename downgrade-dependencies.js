const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Downgrading dependencies for better compatibility...');

// Check Node.js version
const nodeVersion = process.version;
console.log(`Current Node.js version: ${nodeVersion}`);

// Clean everything
const pathsToClean = [
  'node_modules',
  '.next',
  'package-lock.json'
];

pathsToClean.forEach(item => {
  const itemPath = path.join(__dirname, item);
  
  if (fs.existsSync(itemPath)) {
    console.log(`Removing ${item}...`);
    if (fs.lstatSync(itemPath).isDirectory()) {
      fs.rmSync(itemPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(itemPath);
    }
  }
});

// Update package.json to downgrade key dependencies
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log('Updating package.json with compatible dependency versions...');
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Create backup
  fs.writeFileSync(
    path.join(__dirname, 'package.json.backup'), 
    JSON.stringify(packageJson, null, 2), 
    'utf8'
  );
  
  // Update to more compatible versions
  if (packageJson.dependencies) {
    packageJson.dependencies['next'] = '13.4.12';
    packageJson.dependencies['react'] = '18.2.0';
    packageJson.dependencies['react-dom'] = '18.2.0';
    packageJson.dependencies['styled-jsx'] = '5.1.2';
  }
  
  // Add engines field to enforce Node.js version
  packageJson.engines = {
    "node": ">=16.0.0 <19.0.0"
  };
  
  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
}

// Install dependencies with npm ci for exact versions
console.log('Installing dependencies with exact versions...');
try {
  // First, handle core next/react packages
  execSync('npm install next@13.4.12 react@18.2.0 react-dom@18.2.0 styled-jsx@5.1.2 --save', { stdio: 'inherit' });
  console.log('✅ Core dependencies installed successfully!');
  
  // Then, install everything else
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ All dependencies installed successfully!');
} catch (error) {
  console.error('❌ Error installing dependencies:', error);
  
  // Restore backup if there was an error
  const backupPath = path.join(__dirname, 'package.json.backup');
  if (fs.existsSync(backupPath)) {
    console.log('Restoring package.json from backup...');
    fs.copyFileSync(backupPath, packageJsonPath);
    fs.unlinkSync(backupPath);
  }
  
  process.exit(1);
}

// Clean up backup
const backupPath = path.join(__dirname, 'package.json.backup');
if (fs.existsSync(backupPath)) {
  fs.unlinkSync(backupPath);
}

console.log('\n✅ Dependency downgrade complete!');
console.log('\n⚠️ IMPORTANT: This application is configured to work best with Node.js 16.x-18.x');
console.log('Current Node.js version:', nodeVersion);
console.log('Consider using nvm to switch to a compatible Node.js version if you encounter issues.');
console.log('\nTo run the application:');
console.log('npm run dev');
