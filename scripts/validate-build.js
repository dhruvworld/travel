const fs = require('fs');
const path = require('path');

function validateDirectories() {
  const pagesDir = path.join(process.cwd(), 'pages');
  const appDir = path.join(process.cwd(), 'app');
  
  if (!fs.existsSync(appDir)) {
    console.warn('⚠️ App directory is missing!');
    return;
  }

  if (!fs.existsSync(pagesDir)) return;

  const pagesFiles = fs.readdirSync(pagesDir, { recursive: true });
  const appFiles = fs.readdirSync(appDir, { recursive: true });

  const conflicts = pagesFiles.filter(page => {
    const pagePath = page.replace('.tsx', '').replace('.js', '');
    return appFiles.some(appFile => 
      appFile.includes(`${pagePath}/page.`) || appFile === `${pagePath}.`
    );
  });

  if (conflicts.length > 0) {
    console.error('🚨 Detected conflicting routes in pages/ and app/ directories:');
    conflicts.forEach(conflict => console.error(`- ${conflict}`));
    process.exit(1);
  }
}

validateDirectories();
