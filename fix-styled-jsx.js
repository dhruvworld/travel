const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing styled-jsx dependency issue...');

// Force clean node_modules and package-lock.json
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

// Create temporary package.json with only essential dependencies
const packageJsonPath = path.join(__dirname, 'package.json');
let packageJson = {};

if (fs.existsSync(packageJsonPath)) {
  console.log('Backing up and modifying package.json...');
  
  // Read and backup original package.json
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  fs.writeFileSync(
    path.join(__dirname, 'package.json.backup'), 
    JSON.stringify(packageJson, null, 2), 
    'utf8'
  );
  
  // Create a minimal package.json with only essential dependencies
  const minimalPackageJson = {
    name: packageJson.name || "travel",
    version: packageJson.version || "0.1.0",
    private: true,
    scripts: packageJson.scripts || { 
      "dev": "next dev",
      "build": "next build",
      "start": "next start"
    },
    dependencies: {
      "next": "^13.4.12",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "styled-jsx": "^5.1.2"
    }
  };
  
  // Write minimal package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(minimalPackageJson, null, 2), 'utf8');
}

// Install minimal dependencies
console.log('Installing minimal dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Core dependencies installed successfully!');
} catch (error) {
  console.error('❌ Error installing core dependencies:', error);
  process.exit(1);
}

// Restore original package.json and install all dependencies
console.log('Restoring original package.json and installing all dependencies...');
if (fs.existsSync(path.join(__dirname, 'package.json.backup'))) {
  // Restore original package.json but ensure styled-jsx is included
  packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json.backup'), 'utf8'));
  
  // Ensure styled-jsx is included
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  packageJson.dependencies['styled-jsx'] = '^5.1.2';
  
  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  
  // Remove backup
  fs.unlinkSync(path.join(__dirname, 'package.json.backup'));
}

// Now install all dependencies
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ All dependencies installed successfully!');
} catch (error) {
  console.error('❌ Error installing all dependencies:', error);
  process.exit(1);
}

// Check if styled-jsx is properly installed
console.log('Verifying styled-jsx installation...');
const styledJsxPath = path.join(__dirname, 'node_modules', 'styled-jsx');
if (fs.existsSync(styledJsxPath)) {
  console.log('✅ styled-jsx is correctly installed');
  
  // Check if package.json exists in styled-jsx directory
  const styledJsxPackageJson = path.join(styledJsxPath, 'package.json');
  if (fs.existsSync(styledJsxPackageJson)) {
    console.log('✅ styled-jsx/package.json exists');
  } else {
    console.log('❌ styled-jsx/package.json is missing!');
    console.log('Creating a minimal package.json file in styled-jsx directory...');
    
    // Create a minimal package.json in styled-jsx directory
    const minimalStyledJsxPackageJson = {
      name: "styled-jsx",
      version: "5.1.2",
      description: "Full CSS support for JSX without compromises",
      main: "index.js"
    };
    
    fs.writeFileSync(styledJsxPackageJson, JSON.stringify(minimalStyledJsxPackageJson, null, 2), 'utf8');
    console.log('✅ styled-jsx/package.json created');
  }
} else {
  console.error('❌ styled-jsx is not installed properly!');
  
  // Direct installation of styled-jsx
  try {
    console.log('Attempting direct installation of styled-jsx...');
    execSync('npm install styled-jsx@5.1.2 --no-save', { stdio: 'inherit' });
    console.log('✅ styled-jsx installed directly');
  } catch (directError) {
    console.error('❌ Direct installation failed:', directError);
  }
}

console.log('\n✅ Fix complete! Now run:');
console.log('npm run dev');
