const fs = require('fs');
const path = require('path');

// Function to fix JSX fragment issues in a file
function fixJsxFragments(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Pattern to match the problematic JSX structure
    // This looks for lines ending with </> that are likely orphaned fragments
    const lines = content.split('\n');
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const nextLine = lines[i + 1] || '';
      
      // Check if this line has an orphaned closing fragment
      if (line.trim() === '</>' && nextLine.trim() === ')' && nextLine.includes('activeTab')) {
        // This is likely an orphaned fragment, skip it
        modified = true;
        continue;
      }
      
      // Check for lines that end with </> followed by closing divs
      if (line.trim() === '</>' && i > 0) {
        const prevLine = lines[i - 1];
        // If the previous line ends with a div and this is followed by closing divs, it's likely orphaned
        if (prevLine.trim().endsWith('</div>') || prevLine.trim().endsWith('</button>')) {
          // Check if the next few lines are closing divs
          let hasClosingDivs = false;
          for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
            if (lines[j].trim().startsWith('</div>') || lines[j].trim().startsWith('</button>')) {
              hasClosingDivs = true;
              break;
            }
          }
          
          if (hasClosingDivs) {
            // This is likely an orphaned fragment, skip it
            modified = true;
            continue;
          }
        }
      }
      
      newLines.push(line);
    }
    
    if (modified) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
      console.log(`✅ Fixed JSX fragments in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find and process TSX files
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixedCount += processDirectory(filePath);
    } else if (file.endsWith('.tsx')) {
      if (fixJsxFragments(filePath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

// Main execution
const adminDir = path.join(__dirname, 'src', 'modules', 'admin');
console.log('🔍 Scanning for JSX fragment issues...');

if (fs.existsSync(adminDir)) {
  const fixedFiles = processDirectory(adminDir);
  console.log(`\n🎉 Fixed JSX fragments in ${fixedFiles} files!`);
} else {
  console.log('❌ Admin directory not found');
}
