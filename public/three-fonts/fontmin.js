const fs = require('fs');

// Load the JSON font file
const fontJson = require('./Fira Sans Eight_Regular.json');

// Specify the characters you want to keep
const charactersToKeep = 'almaalyALMAALY';

// Helper function to pad the Unicode values
const padUnicode = (unicode) => {
  return unicode.padStart(4, '0'); // Ensures 4-digit Unicode values with leading zeros
};

// Filter the glyphs to keep only those you need
const newGlyphs = {};
for (const char of charactersToKeep) {
  const glyph = fontJson.glyphs[char];  // Access the glyph using the padded hex string
  if (glyph) {
    newGlyphs[char] = glyph;
  }
}

// Create a new font JSON with the filtered glyphs
const newFontJson = {
  ...fontJson,
  glyphs: newGlyphs,
};

// Save the new JSON file
fs.writeFileSync('./minimized/Fira Sans Eight_Regular.json', JSON.stringify(newFontJson, null, 2));

console.log('Font subset created successfully!');