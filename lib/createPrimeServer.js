const createPrimeServer = () => {
return `const express = require('express');
const path = require('path');

const app = express();

const port = 5050;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './primeCompare.html'));
});
app.listen(port, () => console.log('Listening on port 5050, ready to compare'));
`;
};

module.exports = createPrimeServer;
