// server.js
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const crypto = require('crypto');
const fs = require('fs').promises;

const app = express();

// Middleware to generate nonce and attach it to the response

// Apply gzip compression
/* app.use(compression()); */

// Serve static files for English and Arabic
app.use('/en/static', express.static(path.join(__dirname, 'build_en', 'static')));
app.use('/ar/static', express.static(path.join(__dirname, 'build_ar', 'static')));


// Serve manifest.json correctly for English and Arabic
app.get(['/en/manifest.json', '/ar/manifest.json'], (req, res) => {
  const lang = req.path.startsWith('/ar') ? 'ar' : 'en';
  res.sendFile(path.join(__dirname, `build_${lang}`, 'manifest.json'));
});

// Serve favicon.ico correctly for English and Arabic
app.get(['/en/favicon.ico', '/ar/favicon.ico'], (req, res) => { 
  const lang = req.path.startsWith('/ar') ? 'ar' : 'en';
  res.sendFile(path.join(__dirname, `build_${lang}`, 'favicon.ico'));
});

app.get(['/en/three-fonts/*','/ar/three-fonts/*'], (req, res) => {
  const lang = req.path.startsWith('/ar') ? 'ar' : 'en';
  const afterkey = req.path.split('/three-fonts/')[1];
  res.sendFile(path.join(__dirname, `build_${lang}`, 'three-fonts',afterkey));
});

app.get(['/en/images/*','/ar/images/*'], (req, res) => {
  const lang = req.path.startsWith('/ar') ? 'ar' : 'en';
  const afterkey = req.path.split('/images/')[1];
  res.sendFile(path.join(__dirname, `build_${lang}`, 'images',afterkey));
});

app.get(['/en/videos/*','/ar/videos/*'], (req, res) => {
  const lang = req.path.startsWith('/ar') ? 'ar' : 'en';
  const afterkey = req.path.split('/videos/')[1];
  res.sendFile(path.join(__dirname, `build_${lang}`, 'videos',afterkey));
});


app.get(['/en','/en/*'], (req, res) => {
  const indexPath = path.join(__dirname, 'build_en', 'index.html');
  res.sendFile(indexPath);
});

app.get(['/ar','/ar/*'], (req, res) => {
  const indexPath = path.join(__dirname, 'build_ar', 'index.html');
  res.sendFile(indexPath);
});

// Redirect root to /en
app.get('/', (req, res) => {
  res.redirect('/en/');
});

// Handle other undefined routes with 404
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
