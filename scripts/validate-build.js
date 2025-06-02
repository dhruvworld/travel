const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function validateBuild() {
  try {
    // Check for required env vars
    const requiredEnvVars = ['DATABASE_URL'];
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);
    if (missingVars.length) {
      throw new Error(`Missing required env vars: ${missingVars.join(', ')}`);
    }

    // Validate Prisma schema
    console.log('🔍 Validating Prisma schema...');
<<<<<<< HEAD
    execSync('prisma validate', { stdio: 'inherit' });
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27

    // Type check
    console.log('🔍 Running TypeScript checks...');
    execSync('tsc --noEmit', { stdio: 'inherit' });

    // Lint
    console.log('🔍 Running ESLint...');
    execSync('next lint', { stdio: 'inherit' });

    // Check for presence of key config files
    const requiredFiles = [
      'next.config.js',
<<<<<<< HEAD
      'prisma/schema.prisma',
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
      'app/layout.tsx'
    ];

    requiredFiles.forEach(file => {
      if (!fs.existsSync(path.resolve(process.cwd(), file))) {
        throw new Error(`Required file missing: ${file}`);
      }
    });

    console.log('✅ All validation checks passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Build validation failed:', error.message);
    process.exit(1);
  }
}

validateBuild();
