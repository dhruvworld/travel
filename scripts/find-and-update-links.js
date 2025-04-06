const fs = require('fs');
const path = require('path');

// Function to recursively search for files in a directory
function findFiles(directory, extension, filePaths = []) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      findFiles(filePath, extension, filePaths);
    } else if (stat.isFile() && (file.endsWith(extension) || extension === '*')) {
      filePaths.push(filePath);
    }
  }
  
  return filePaths;
}

// Function to check if file contains a specific string
function fileContainsString(filePath, searchString) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(searchString);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false;
  }
}

// Function to update the content of a file
function updateFile(filePath, originalString, newString) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(originalString)) {
      content = content.replace(new RegExp(originalString, 'g'), newString);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error updating file ${filePath}:`, error);
    return false;
  }
}

// Start the search and update process
const projectRoot = path.join(__dirname, '..');
const filesWithLinks = [];

// File extensions to search (add more as needed)
const extensions = ['.js', '.jsx', '.tsx', '.html'];

// Find files with tour links
for (const extension of extensions) {
  const files = findFiles(projectRoot, extension);
  
  for (const file of files) {
    if (fileContainsString(file, 'href="/tour') || 
        fileContainsString(file, 'href="/packages') || 
        fileContainsString(file, '<a href="/packages"') ||
        fileContainsString(file, 'href="/destinations') ||
        fileContainsString(file, '/destinations')) {
      filesWithLinks.push(file);
    }
  }
}

console.log(`Found ${filesWithLinks.length} files containing relevant links`);

// Update links in the found files
let totalUpdatedFiles = 0;

for (const filePath of filesWithLinks) {
  // Update package links to tours
  const updated1 = updateFile(
    filePath, 
    '<a href="/packages">View Packages</a>', 
    '<a href="/tours">View Packages</a>'
  );
  
  // Update any other variations
  const updated2 = updateFile(
    filePath, 
    'href="/packages"', 
    'href="/tours"'
  );
  
  // Special case for "View Packages" text
  const updated3 = updateFile(
    filePath, 
    '<a href="/tour">View Packages</a>', 
    '<a href="/tours">View Packages</a>'
  );
  
  // Remove destinations references
  const updated4 = updateFile(
    filePath, 
    'href="/destinations"', 
    'href="/tours"'
  );
  
  const updated5 = updateFile(
    filePath, 
    '/destinations/', 
    '/tours/'
  );
  
  if (updated1 || updated2 || updated3 || updated4 || updated5) {
    totalUpdatedFiles++;
  }
}

console.log(`Updated ${totalUpdatedFiles} files`);
