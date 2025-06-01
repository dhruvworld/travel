const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting auth fix script...');

// Step 1: Clean up next's cache
console.log('Cleaning Next.js cache...');
try {
  if (fs.existsSync(path.join(__dirname, '../.next'))) {
    fs.rmSync(path.join(__dirname, '../.next'), { recursive: true, force: true });
    console.log('Removed .next directory');
  }
} catch (error) {
  console.error('Error cleaning Next.js cache:', error);
}

// Step 2: Check for NEXTAUTH_SECRET in .env.local
try {
  let fixedSecretIssue = false;
  const envPath = path.join(__dirname, '../.env.local');
  
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if there's a complex NEXTAUTH_SECRET 
    if (/NEXTAUTH_SECRET=.*[^\w]/.test(envContent)) {
      // Replace with a simpler secret
      envContent = envContent.replace(
        /NEXTAUTH_SECRET=.*/,
        'NEXTAUTH_SECRET="abcdef1234567890abcdef1234567890"'
      );
      fs.writeFileSync(envPath, envContent);
      fixedSecretIssue = true;
      console.log('✓ Updated NEXTAUTH_SECRET with a simpler value');
    }
  } else {
    // Create .env.local with proper NEXTAUTH_SECRET if it doesn't exist
    fs.writeFileSync(
      envPath,
      'NEXTAUTH_SECRET="abcdef1234567890abcdef1234567890"\nNEXTAUTH_URL=http://localhost:3000\n'
    );
    console.log('✓ Created .env.local with proper NEXTAUTH_SECRET');
    fixedSecretIssue = true;
  }
  
  if (fixedSecretIssue) {
    console.log('⚠️ NEXTAUTH_SECRET was updated. You need to restart your dev server!');
  }
} catch (error) {
  console.error('Error checking/updating .env.local:', error);
}

console.log('\n🔔 Instructions to fix JWT decryption errors:');
console.log('1. Restart your Next.js server');
console.log('2. Clear your browser cookies for this site');
console.log('3. Try signing in again\n');

console.log('Fix complete! Run `npm run dev` to restart your server.');
