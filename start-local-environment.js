//start-local-environment.js

const { exec } = require('child_process');

const runScript = (lang) => {
  return new Promise((resolve, reject) => {
    exec(`PUBLIC_URL=${'http://localhost:3000/'} LANG=${lang} node create-html.js`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating HTML for ${lang}:`, error);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
};

Promise.all([runScript('ar'), runScript('en')])
  .then(() => {
    console.log('Starting local enviroment')
    exec('craco start', (error, stdout, stderr) => {
      if (error) {
        console.error('Error starting craco:', error);
      } else {
        console.log(stdout);
      }
    });
  })
  .catch((error) => console.error('Error during HTML generation:', error));
