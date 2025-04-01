// fix-next-auth-jwt.js
// This script helps fix Next-Auth JWT decryption errors

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// ANSI color codes for better output formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}Next-Auth JWT Decryption Error Fix${colors.reset}\n`);

// 1. Generate a secure random secret
function generateSecret() {
  console.log(`${colors.yellow}Generating a secure NEXTAUTH_SECRET...${colors.reset}`);
  const secret = crypto.randomBytes(32).toString('base64');
  return secret;
}

// 2. Find and update .env files
function updateEnvFiles(secret) {
  const envPaths = ['.env', '.env.local', '.env.development', '.env.production'];
  let updated = false;

  envPaths.forEach(envFile => {
    const envPath = path.join(process.cwd(), envFile);
    
    if (fs.existsSync(envPath)) {
      console.log(`${colors.yellow}Found ${envFile}${colors.reset}`);
      
      let content = fs.readFileSync(envPath, 'utf8');
      const hasNextAuthSecret = content.includes('NEXTAUTH_SECRET=');
      
      if (hasNextAuthSecret) {
        // Replace existing NEXTAUTH_SECRET
        content = content.replace(/NEXTAUTH_SECRET=.*$/m, `NEXTAUTH_SECRET=${secret}`);
        console.log(`${colors.green}Updated NEXTAUTH_SECRET in ${envFile}${colors.reset}`);
      } else {
        // Add NEXTAUTH_SECRET if it doesn't exist
        content += `\nNEXTAUTH_SECRET=${secret}\n`;
        console.log(`${colors.green}Added NEXTAUTH_SECRET to ${envFile}${colors.reset}`);
      }
      
      // Ensure NEXTAUTH_URL is set for development
      if (!content.includes('NEXTAUTH_URL=')) {
        content += `NEXTAUTH_URL=http://localhost:3000\n`;
        console.log(`${colors.green}Added NEXTAUTH_URL to ${envFile}${colors.reset}`);
      }
      
      fs.writeFileSync(envPath, content);
      updated = true;
    }
  });

  if (!updated) {
    // Create a new .env.local if no env files exist
    console.log(`${colors.yellow}No .env files found. Creating .env.local${colors.reset}`);
    const newEnvContent = `NEXTAUTH_SECRET=${secret}\nNEXTAUTH_URL=http://localhost:3000\n`;
    fs.writeFileSync(path.join(process.cwd(), '.env.local'), newEnvContent);
  }
}

// 3. Check and update NextAuth configuration
function checkNextAuthConfig() {
  console.log(`${colors.yellow}Checking NextAuth configuration...${colors.reset}`);
  
  // Common paths for NextAuth config
  const possiblePaths = [
    'pages/api/auth/[...nextauth].js',
    'pages/api/auth/[...nextauth].ts',
    'app/api/auth/[...nextauth]/route.js',
    'app/api/auth/[...nextauth]/route.ts',
    'src/pages/api/auth/[...nextauth].js',
    'src/pages/api/auth/[...nextauth].ts',
    'src/app/api/auth/[...nextauth]/route.js',
    'src/app/api/auth/[...nextauth]/route.ts'
  ];
  
  let configPath = null;
  
  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      configPath = path;
      break;
    }
  }
  
  if (configPath) {
    console.log(`${colors.green}Found NextAuth config at: ${configPath}${colors.reset}`);
    console.log(`${colors.yellow}Please ensure your NextAuth config has correct JWT settings:${colors.reset}`);
    console.log(`
${colors.cyan}export default NextAuth({
  // Your providers...
  
  jwt: {
    // Use secure defaults
    // secret: process.env.NEXTAUTH_SECRET
    // Don't set custom encryption unless necessary
  },
  
  // Other configuration...
})${colors.reset}`);
  } else {
    console.log(`${colors.red}Could not locate NextAuth configuration file.${colors.reset}`);
    console.log(`${colors.yellow}Please check your project structure and ensure NextAuth is properly configured.${colors.reset}`);
  }
}

// 4. Clear browser storage instructions
function showCleanupInstructions() {
  console.log(`\n${colors.bright}${colors.yellow}Next Steps:${colors.reset}`);
  console.log(`1. ${colors.green}Restart your Next.js development server${colors.reset}`);
  console.log(`2. ${colors.green}Clear your browser cookies and local storage${colors.reset}`);
  console.log(`3. ${colors.green}Try logging in again${colors.reset}`);
}

// Main execution
try {
  const secret = generateSecret();
  updateEnvFiles(secret);
  checkNextAuthConfig();
  showCleanupInstructions();
  
  console.log(`\n${colors.bright}${colors.green}Script completed successfully!${colors.reset}`);
} catch (error) {
  console.error(`\n${colors.red}Error fixing Next-Auth JWT issue:${colors.reset}`, error);
  process.exit(1);
}