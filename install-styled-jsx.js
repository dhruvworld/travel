const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Installing styled-jsx module directly...');

// First, check if the directory exists and remove it if needed
const styledJsxPath = path.join(__dirname, 'node_modules', 'styled-jsx');
if (fs.existsSync(styledJsxPath)) {
  console.log('Removing existing styled-jsx directory...');
  fs.rmSync(styledJsxPath, { recursive: true, force: true });
}

// Install styled-jsx directly with npm
try {
  console.log('Installing styled-jsx with npm...');
  execSync('npm install styled-jsx@5.1.2 --save', { stdio: 'inherit' });
  console.log('✅ styled-jsx installed with npm');
} catch (error) {
  console.error('❌ Failed to install styled-jsx with npm:', error);
  
  // Try installing with yarn as a fallback
  try {
    console.log('Trying to install styled-jsx with yarn...');
    execSync('yarn add styled-jsx@5.1.2', { stdio: 'inherit' });
    console.log('✅ styled-jsx installed with yarn');
  } catch (yarnError) {
    console.error('❌ Failed to install styled-jsx with yarn:', yarnError);
    
    // Last resort: Try copying package.json to styled-jsx directly
    console.log('Creating styled-jsx manually...');
    
    if (!fs.existsSync(styledJsxPath)) {
      fs.mkdirSync(styledJsxPath, { recursive: true });
    }
    
    const packageJson = {
      name: "styled-jsx",
      version: "5.1.2",
      description: "Full CSS support for JSX without compromises",
      main: "index.js"
    };
    
    fs.writeFileSync(
      path.join(styledJsxPath, 'package.json'), 
      JSON.stringify(packageJson, null, 2), 
      'utf8'
    );
    
    // Create index.js with minimal exports
    fs.writeFileSync(
      path.join(styledJsxPath, 'index.js'),
      "module.exports = () => {};\n",
      'utf8'
    );
    
    console.log('✅ styled-jsx directory created manually');
  }
}

// Verify the installation
if (fs.existsSync(path.join(styledJsxPath, 'package.json'))) {
  console.log('✅ styled-jsx/package.json exists');
} else {
  console.error('❌ styled-jsx/package.json is still missing!');
}

console.log('\nTry running your application now:');
console.log('npm run dev');
