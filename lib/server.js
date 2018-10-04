/**
 * 
 * @param {Object} input - Object containing user input from CLI (requires the .static property)
 */

const server = (input) => {
return `const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const Loadable = require('react-loadable');

// import middleware to return HTML on server request
import returnHTML from './returnHTML';

const app = express();
const PORT = 8080;

// apply middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
  NOTE: captures all routes and returns the user's HTML 
        (may not be ideal for non-SPAs)
*/
app.use(express.Router().get('/', returnHTML));
app.use(express.static(path.resolve(__dirname, \`../${input.static}\`)));
app.use(returnHTML);

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(\`Listening on \${PORT}...\`);
  });
});

app.on('error', (err) => {
  if (err) {
    console.log(\`Error: \${error}\`);
    throw err;
  }
});`;
};

module.exports = server;
