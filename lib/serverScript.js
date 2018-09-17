const getServerScript = userInput => `
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '${userInput.component}';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('${userInput.static}'));

app.get('/', (req, res) => {
  const content = renderToString(<App />);

  const html = \`
    <html>
      <head></head>
      <body>
        <div id="root">\${content}\</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  \`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(\`App running \${PORT}\`);
});
`;

module.exports = getServerScript;