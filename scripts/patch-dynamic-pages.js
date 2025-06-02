const fs = require('fs');
const path = require('path');

// Root directory of your Next.js app
const appDir = path.join(__dirname, '..', 'app');

// Function to recursively get all .tsx files
function getAllTsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsxFiles(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  }

  return results;
}

// Check if file needs patching and patch it
function patchFile(filePath) {
  console.log(`Checking: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if file already has dynamic export
  if (content.includes("export const dynamic = 'auto'")) {
    console.log(`  Already patched: ${filePath}`);
    return false;
  }
  
  // Check if imports headers or cookies from next/headers
  const usesNextHeaders = (
    content.includes('next/headers') && 
    (content.includes('headers') || content.includes('cookies'))
  );
  
  if (!usesNextHeaders) {
    console.log(`  No next/headers usage, skipping: ${filePath}`);
    return false;
  }

  // Patch the file - handle 'use client' correctly
  let newContent;
  if (content.trim().startsWith("'use client'") || content.trim().startsWith('"use client"')) {
    // If file starts with 'use client', add dynamic after it
    const useClientEndIndex = content.indexOf("'use client'") + "'use client'".length;
    const afterUseClient = useClientEndIndex !== -1 ? 
      useClientEndIndex : 
      content.indexOf('"use client"') + '"use client"'.length;
      
    // Check if there's already a newline after 'use client'
    const hasNewlineAfterUseClient = content.charAt(afterUseClient) === '\n';
    
    // Insert dynamic directive after 'use client' directive with proper spacing
    newContent = hasNewlineAfterUseClient ?
      `${content.slice(0, afterUseClient)}\nexport const dynamic = 'auto';${content.slice(afterUseClient)}` :
      `${content.slice(0, afterUseClient)}\n\nexport const dynamic = 'auto';${content.slice(afterUseClient)}`;
  } else {
    // If no 'use client', add dynamic at the beginning
    newContent = `export const dynamic = 'auto';\n\n${content}`;
  }
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  ✅ Patched: ${filePath}`);
  return true;
}

// Main execution
function main() {
  console.log('Starting Netlify compatibility patching for Next.js...');
  
  // Get all .tsx files
  const tsxFiles = getAllTsxFiles(appDir);
  console.log(`Found ${tsxFiles.length} total .tsx/.jsx/.js files.`);

  // Process each file
  let patchCount = 0;
  for (const file of tsxFiles) {
    if (patchFile(file)) {
      patchCount++;
    }
  }

  console.log(`\n✅ Done! Patched ${patchCount} files for Netlify compatibility.`);
  
  if (patchCount > 0) {
    console.log("\n⚠️  IMPORTANT: Don't forget to rebuild your application with:");
    console.log("   npm run build");
    console.log("\nThis will ensure all dynamic routes are properly handled by Netlify.");
  }
}

main();
