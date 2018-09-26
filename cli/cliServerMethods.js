const fs = require('fs');

const cliServerMethods = {};

cliServerMethods.startComparisonHtml = () => {
  fs.readFile('./index.html', (err, html) => {
    if (err) throw err;

    http.createServer((req, res) => {
      res.writeHead(200, { 'Content-type': 'text/plain' });
    });
  });
};

module.exports = cliServerMethods;
