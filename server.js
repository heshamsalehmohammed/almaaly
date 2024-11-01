// server.js
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the build directories
app.use('/en', express.static(path.join(__dirname, 'build_en')));
app.use('/ar', express.static(path.join(__dirname, 'build_ar')));

// Fallback to index.html for React Router
app.get('/en/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build_en', 'index.html'));
});

app.get('/ar/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build_ar', 'index.html'));
});

// Redirect root to English version
app.get('/', (req, res) => {
  res.redirect('/en');
});

// Handle all other routes and redirect to English
app.get('*', (req, res) => {
  res.redirect('/en');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
