// server.js
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          // Add hashes or nonces if you need to allow specific inline scripts
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Temporarily allow inline styles (can be tightened later)
          'https://fonts.googleapis.com', // Allow Google Fonts
        ],
        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com', // Allow Google Fonts
          'data:',
        ],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

app.use(compression());

// Serve static files from the build directories
// Serve static files for English and Arabic
app.use('/en', express.static(path.join(__dirname, 'build_en')));
app.use('/ar', express.static(path.join(__dirname, 'build_ar')));

// Serve manifest.json correctly
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'build_en', 'manifest.json'));
});

app.get('/en/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'build_en', 'manifest.json'));
});

app.get('/ar/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'build_ar', 'manifest.json'));
});

// Fallback to index.html for client-side routing in English
app.get('/en/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build_en', 'index.html'));
});

// Fallback to index.html for client-side routing in Arabic
app.get('/ar/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build_ar', 'index.html'));
});

// Redirect root to /en
app.get('/', (req, res) => {
  res.redirect('/en');
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
