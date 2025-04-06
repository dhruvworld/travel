const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing Next.js dependency issues...');

// Check Node.js version
const nodeVersion = process.version;
console.log(`Current Node.js version: ${nodeVersion}`);

// Parse Node.js version (removes 'v' prefix and splits into parts)
const versionParts = nodeVersion.slice(1).split('.').map(Number);
const majorVersion = versionParts[0];

if (majorVersion > 18) {
  console.warn('⚠️ Warning: You are using Node.js version higher than 18, which may have compatibility issues with some Next.js versions.');
  console.warn('Consider switching to Node.js 18.x using nvm or a similar tool.');
}

// Check if we need to clean node_modules
const cleanNodeModules = process.argv.includes('--clean');
if (cleanNodeModules || process.argv.includes('--full-clean')) {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('Removing node_modules...');
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
  }
}

// Always clean .next 
const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  console.log('Removing .next directory...');
  fs.rmSync(nextDir, { recursive: true, force: true });
}

// Update package.json to ensure all required dependencies are included
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log('Updating package.json with required dependencies...');
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Ensure required dependencies are present with compatible versions
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  
  // Add or update critical dependencies
  packageJson.dependencies['styled-jsx'] = '^5.1.2';
  
  // If using Node.js 20+, ensure we're using compatible Next.js version
  if (majorVersion >= 20) {
    console.log('Ensuring Next.js compatibility with Node.js 20+...');
    packageJson.dependencies['next'] = '^13.4.12';
  }
  
  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
}

// Check for npm version
let npmVersion;
try {
  npmVersion = execSync('npm --version').toString().trim();
  console.log(`Using npm version: ${npmVersion}`);
} catch (error) {
  console.warn('⚠️ Could not determine npm version');
}

// Install dependencies
console.log('Installing dependencies...');
try {
  if (process.argv.includes('--full-clean')) {
    // More aggressive installation
    console.log('Using clean install option...');
    execSync('npm ci', { stdio: 'inherit' });
  } else {
    // Regular installation
    execSync('npm install', { stdio: 'inherit' });
  }
  console.log('✅ Dependencies installed successfully!');
  
  // Direct installation of styled-jsx
  console.log('Installing styled-jsx directly...');
  execSync('npm install styled-jsx@5.1.2 --save', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error installing dependencies:', error);
  console.log('Trying to install styled-jsx directly...');
  
  try {
    execSync('npm install styled-jsx@5.1.2 --save', { stdio: 'inherit' });
    console.log('✅ styled-jsx installed successfully!');
  } catch (styledJsxError) {
    console.error('❌ Error installing styled-jsx:', styledJsxError);
    process.exit(1);
  }
}

// Check if the styled-jsx module exists
const styledJsxPath = path.join(__dirname, 'node_modules', 'styled-jsx');
if (!fs.existsSync(styledJsxPath)) {
  console.error('❌ styled-jsx module folder is still missing!');
  console.log('Please run the specialized fix script:');
  console.log('node fix-styled-jsx.js');
  process.exit(1);
}

console.log('\n✅ All dependency issues fixed! Now run:');
console.log('npm run dev');
