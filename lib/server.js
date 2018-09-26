const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
// const morgan = require('morgan');
const Loadable = require('react-loadable');

// import middleware to return HTML on server request
const returnHTML = require('./returnHTML.js');

const app = express();
const PORT = 8080;

// apply middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*
  NOTE: check the path
*/
app.use(express.static(path.join(__dirname, '/build')));

/*
  NOTE: captures all routes and returns the user's HTML 
        (may not be ideal for non-SPAs)
*/
app.get('*', returnHTML);

Loadable.preloadAll().then(() => {
  app.listen((PORT) => {
    console.log(`Listening on ${PORT}...`);
  });
});

app.on('error', (err) => {
  if (err) {
    console.log(`Error: ${error}`);
    throw err;
  }
});