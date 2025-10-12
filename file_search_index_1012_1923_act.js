// 代码生成时间: 2025-10-12 19:23:38
const fs = require('fs');
const path = require('path');

// Function to recursively search for files in a directory
function searchFiles(directory, searchPattern, index = {}) {
  try {
    // Read the directory contents
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const fullPath = path.join(directory, file);

      // Check if it's a file and matches the search pattern
      if (fs.statSync(fullPath).isFile() && file.match(searchPattern)) {
        // Add file path to the index
        index[fullPath] = fs.readFileSync(fullPath, 'utf8');
      }

      // If it's a directory, recursively search within it
      else if (fs.statSync(fullPath).isDirectory()) {
        searchFiles(fullPath, searchPattern, index);
      }
    });

    return index;
  } catch (error) {
    console.error("There was an error searching files: \${error.message}");
  }
}

// Function to start the search with a given directory and pattern
function startSearch(directoryPath, pattern) {
  if (!fs.existsSync(directoryPath)) {
    console.error("The specified directory does not exist: \${directoryPath}");
    return;
  }

  const index = searchFiles(directoryPath, new RegExp(pattern, 'i'));
  console.log('File index:', index);
}

// Example usage:
const directoryPath = './';
const searchPattern = '\.txt$'; // Search for text files

startSearch(directoryPath, searchPattern);