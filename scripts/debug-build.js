const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting Next.js build debugging...');

// Check current memory limits
console.log('\n🧠 Node.js memory information:');
try {
  const memoryUsage = process.memoryUsage();
  console.log(`Heap used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`);
  console.log(`Heap total: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`);
  console.log(`RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)}MB`);
} catch (error) {
  console.error('Error checking memory:', error);
}

// Clean cache
console.log('\n🧹 Cleaning Next.js cache...');
const nextCacheDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextCacheDir)) {
  try {
    fs.rmSync(nextCacheDir, { recursive: true, force: true });
    console.log('✓ Successfully removed .next directory');
  } catch (error) {
    console.error('Error removing .next directory:', error);
  }
}

// Perform build with debug information
console.log('\n🛠️ Starting build with debug flags...');
try {
  execSync('NEXT_DEBUG=true NODE_OPTIONS=--max-old-space-size=4096 npx next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_DEBUG: 'true',
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });
  console.log('✓ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  console.log('\n🔍 Attempting targeted page build...');
  console.log('This will help identify which page is causing issues.\n');
  
  try {
    // Create a temporary minimal app
    const tempAppDir = path.join(__dirname, '..', 'app-temp');
    if (!fs.existsSync(tempAppDir)) {
      fs.mkdirSync(tempAppDir);
    }
    
    // Create a simple layout.tsx and page.tsx
    fs.writeFileSync(
      path.join(tempAppDir, 'layout.tsx'),
      `export default function RootLayout({ children }) { return <html><body>{children}</body></html>; }`
    );
    
    fs.writeFileSync(
      path.join(tempAppDir, 'page.tsx'),
      `export default function Page() { return <div>Debug Page</div>; }`
    );
    
    console.log('Testing build with minimal app...');
    execSync('NEXT_DEBUG=true NODE_OPTIONS=--max-old-space-size=4096 npx next build', {
      stdio: 'inherit',
      env: {
        ...process.env,
        NEXT_DEBUG: 'true',
        NODE_OPTIONS: '--max-old-space-size=4096',
        NEXT_MINIMAL_APP: tempAppDir
      }
    });
    
    // Clean up
    fs.rmSync(tempAppDir, { recursive: true, force: true });
    
  } catch (minBuildError) {
    console.error('Even minimal build failed:', minBuildError.message);
  }
}

console.log('\n✓ Debug process complete');
console.log('\nIf you continue to have issues, try:');
console.log('1. Check for hanging async functions in server components');
console.log('2. Look for infinite loops in useEffect or other hooks');
console.log('3. Run build with --debug flag: npx next build --debug');
console.log('4. Try building with Node.js 18.x if using a newer version');
