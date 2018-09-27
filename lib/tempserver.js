const express = require('express');
const app = express();

const port = 5000;

app.listen(port, () => console.log('listening on port 5000'));

module.exports = app;