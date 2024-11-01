// copy-lang-index.js
const fs = require('fs-extra');
const path = require('path');

const lang = process.env.LANG || 'en';

const sourcePath = path.join(__dirname, 'public_langs', lang, 'index.html');
const destPath = path.join(__dirname, 'public', 'index.html');

async function copyIndex() {
  try {
    console.log(`Copying ${sourcePath} to ${destPath}`);

    // Check if source index.html exists
    const exists = await fs.pathExists(sourcePath);
    if (!exists) {
      throw new Error(`Source index.html does not exist at ${sourcePath}`);
    }

    // Copy the language-specific index.html to public/index.html
    await fs.copy(sourcePath, destPath, { overwrite: true });

    console.log(`Successfully copied ${sourcePath} to ${destPath}`);
  } catch (err) {
    console.error(`Error copying ${sourcePath} to ${destPath}:`, err);
    process.exit(1); // Exit with failure
  }
}

copyIndex();
