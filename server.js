// server.js
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const crypto = require('crypto');
const fs = require('fs').promises;

const app = express();

// Middleware to generate nonce and attach it to the response
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Configure Helmet with CSP including the nonce
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          (req, res) => `'nonce-${res.locals.nonce}'`, // Allow scripts with the matching nonce
          "'unsafe-eval'",
        ],
        styleSrc: [
          "'self'",
          (req, res) => `'nonce-${res.locals.nonce}'`, // Allow styles with the matching nonce
          'https://fonts.googleapis.com', // Allow Google Fonts
          "'unsafe-eval'",
        ],
        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com', // Allow Google Fonts
          'data:',
          "'unsafe-eval'",
        ],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    // Other Helmet configurations can be added here
  })
);

// Apply gzip compression
app.use(compression());

// Serve static files for English and Arabic
app.use('/en/static', express.static(path.join(__dirname, 'build_en', 'static')));
app.use('/ar/static', express.static(path.join(__dirname, 'build_ar', 'static')));

// Function to inject nonce into HTML files
const injectNonce = async (filePath, nonce) => {
  try {
    let html = await fs.readFile(filePath, 'utf8');

    // Replace data-nonce with the actual nonce
    html = html.replace(/data-nonce="REPLACE_WITH_NONCE"/g, `nonce="${nonce}"`);

    return html;
  } catch (error) {
    console.error(`Error injecting nonce: ${error}`);
    throw error;
  }
};

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

// Fallback to index.html for client-side routing in English
app.get('/en/*', async (req, res) => {
  try {
    const indexPath = path.join(__dirname, 'build_en', 'index.html');
    const modifiedHtml = await injectNonce(indexPath, res.locals.nonce);
    res.set('Content-Type', 'text/html');
    res.send(modifiedHtml);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Fallback to index.html for client-side routing in Arabic
app.get('/ar/*', async (req, res) => {
  try {
    const indexPath = path.join(__dirname, 'build_ar', 'index.html');
    const modifiedHtml = await injectNonce(indexPath, res.locals.nonce);
    res.set('Content-Type', 'text/html');
    res.send(modifiedHtml);
  } catch (error) {
    res.status(500).send('Server Error');
  }
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
