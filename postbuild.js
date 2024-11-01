// postbuild.js
const fs = require('fs-extra');
const path = require('path');

const lang = process.env.LANG || 'en';

const buildDir = path.join(__dirname, 'build');
const langDir = path.join(__dirname, `build_${lang}`); // e.g., build_en, build_ar

async function copyBuildFiles() {
  try {
    console.log(`Copying from ${buildDir} to ${langDir}`);

    // Ensure the language-specific build directory exists
    await fs.ensureDir(langDir);

    // Copy build files to the language-specific directory
    await fs.copy(buildDir, langDir, { overwrite: true });

    // Remove the original build directory to prevent conflicts
    await fs.remove(buildDir);

    console.log(`Build files copied to ${langDir} and original build directory removed.`);
  } catch (err) {
    console.error('Error copying build files:', err);
    process.exit(1); // Exit with failure
  }
}

copyBuildFiles();
