const fs = require('fs').promises;
const path = require('path');

// Function for version-style sorting (like sort -V in Linux)
function versionCompare(a, b) {
  // Split the paths into components
  const regex = /(\d+)|(\D+)/g;
  
  // Get filename parts only for sorting
  const filenameA = path.basename(a);
  const filenameB = path.basename(b);
  
  const partsA = String(filenameA).match(regex) || [];
  const partsB = String(filenameB).match(regex) || [];
  
  // If directories are different, sort by directory first
  const dirA = path.dirname(a);
  const dirB = path.dirname(b);
  
  if (dirA !== dirB) {
    return dirA.localeCompare(dirB);
  }
  
  // Compare each part
  const len = Math.min(partsA.length, partsB.length);
  
  for (let i = 0; i < len; i++) {
    const partA = partsA[i];
    const partB = partsB[i];
    
    // If both parts are numeric
    if (!isNaN(partA) && !isNaN(partB)) {
      const numA = parseInt(partA, 10);
      const numB = parseInt(partB, 10);
      if (numA !== numB) {
        return numA - numB;
      }
    } else {
      // String comparison
      const comp = partA.localeCompare(partB);
      if (comp !== 0) {
        return comp;
      }
    }
  }
  
  // If all parts so far are equal, the shorter string comes first
  return partsA.length - partsB.length;
}

// Function to recursively walk directories and find PNG files
async function findPngFiles(dir) {
  const results = [];
  
  try {
    // Read the directory contents
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively walk subdirectories
        const subResults = await findPngFiles(fullPath);
        results.push(...subResults);
      } else if (entry.isFile() && path.extname(entry.name) === '.png') {
        // Found a PNG file, store its path
        results.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return results;
}

// Function to get corresponding TXT file content
async function getTxtContent(pngPath) {
  const txtPath = pngPath.replace('.png', '.txt');
  try {
    return await fs.readFile(txtPath, 'utf8');
  } catch (error) {
    console.warn(`Warning: Could not read corresponding text file for ${pngPath}`);
    return '';
  }
}

// Main function
async function generateImagesJson(directories) {
  try {
    // Check if directories were provided
    if (directories.length === 0) {
      console.error('Error: No directories specified. Please provide at least one directory.');
      console.log('Usage: node script.js dir1 dir2 dir3 ...');
      return;
    }
    
    // Find all PNG files in the specified directories
    let allPngFiles = [];
    
    for (const dir of directories) {
      console.log(`Scanning directory: ${dir}`);
      const pngFiles = await findPngFiles(dir);
      allPngFiles.push(...pngFiles);
    }
    
    // Sort PNG files using version sort
    allPngFiles.sort(versionCompare);
    
    console.log(`Found ${allPngFiles.length} PNG files.`);
    
    // Build the images array by reading corresponding TXT files
    const images = [];
    for (const pngFile of allPngFiles) {
      const txtContent = await getTxtContent(pngFile);
      
      // Each PNG file appears twice in your example, so add it twice
      const entry = {
        url: pngFile.replace(/\\/g, '/'), // Ensure forward slashes for paths
        content: txtContent
      };
      images.push(entry);
      // images.push({...entry}); // Add a duplicate as per your example
    }
    
    // Create the final JSON object
    const jsonData = {
      images: images
    };
    
    // Write to images.json
    await fs.writeFile('images.json', JSON.stringify(jsonData, null, 2));
    console.log('Successfully created images.json');
    
  } catch (error) {
    console.error('Error generating images.json:', error);
  }
}

// Get directories from command-line arguments
// const directories = process.argv.slice(2);

// Run the script
generateImagesJson('.');
