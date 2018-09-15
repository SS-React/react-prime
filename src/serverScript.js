const getServerScript = userInput => `
import 'babel-polyfill';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import bodyParser from 'body-parser';

import App from '${userInput.component}';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('${userInput.static}'));

app.get('*', (req, res) => {
  const context = {}
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const html = \`
    <html>
      <head>
      </head>
      <body>
        <div id="root">
          ${content}
        </div>
        <script src="main.js"></script>
        <script src="client_bundle.js"></script>
      </body>
    </html>
  \`;

  res.send(html)
});

app.listen(PORT, () => {
  console.log(\`App running ${PORT}\`);
});
`;

module.exports = {
  getServerScript,
}