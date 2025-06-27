const fs = require('fs');

const GENERIC_FILE = 'generic-instructions.md';
const LOCAL_FILE = '.github/copilot-instructions-local.md';
const OUTPUT_FILE = '.github/copilot-instructions.md';

function mergeInstructions() {
  try {

    const genericContent = fs.readFileSync(GENERIC_FILE, 'utf8');
    console.log('Loaded generic instructions');

    let localContent = '';
    if (fs.existsSync(LOCAL_FILE)) {
      localContent = fs.readFileSync(LOCAL_FILE, 'utf8');
      console.log('Found local instructions file');
    } else {
      console.log('No local instructions file found, using only generic instructions');
    }

    let finalContent = genericContent;
    
    if (localContent.trim()) {
      finalContent += '\n\n---\n\n' + localContent;
    }
    
    fs.writeFileSync(OUTPUT_FILE, finalContent);
    console.log('Successfully merged copilot instructions');
    
  } catch (error) {
    console.error('Error merging instructions:', error);
    process.exit(1);
  }
}

mergeInstructions();
