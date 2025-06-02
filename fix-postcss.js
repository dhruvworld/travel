const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing PostCSS dependency issues...');

// Clean caches and node_modules
const directories = [
  '.next',
  'node_modules'
];

// Delete directories
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`);
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
});

// Update package.json to use compatible PostCSS versions
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log('Updating package.json with compatible PostCSS versions...');
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Ensure specific compatible versions
  if (packageJson.dependencies) {
    packageJson.dependencies.postcss = "^8.4.31";
  }
  
  if (packageJson.devDependencies) {
    packageJson.devDependencies.postcss = "^8.4.31";
    packageJson.devDependencies["postcss-import"] = "^15.1.0";
    packageJson.devDependencies["postcss-nested"] = "^6.0.1";
  }
  
  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
}

// Create proper postcss.config.js
const postcssConfigPath = path.join(__dirname, 'postcss.config.js');
console.log('Creating updated postcss.config.js...');
const postcssConfig = `
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  }
}
`;
fs.writeFileSync(postcssConfigPath, postcssConfig, 'utf8');

// Remove any duplicate postcss config files
const cjsConfigPath = path.join(__dirname, 'postcss.config.cjs');
if (fs.existsSync(cjsConfigPath)) {
  console.log('Removing duplicate postcss.config.cjs...');
  fs.unlinkSync(cjsConfigPath);
}

// Run npm install
console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
} catch (error) {
  console.error('Error installing dependencies:', error);
  process.exit(1);
}

console.log('✅ PostCSS issues fixed! Now run:');
console.log('npm run dev');
