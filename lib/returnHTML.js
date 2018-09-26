module.exports = (input) => {
return `// standard react modules
import React from 'react';
import { renderToString } from 'react-dom/server';
// security middleware
import Helmet from 'react-helmet';
// required for react router
import { StaticRouter } from 'react-router';
// frontload helps when trying to render react components that need to
// retrieve data asynchronously
import { Frontload, frontloadServerRender } from 'react-frontload';
import Loadable from 'react-loadable';
import path from 'path';
import fs from 'fs';

// main entrypoint and manifest (included in CRA)
import App from '../\${input.component}';
import manifest from '../build/asset-manifest.json';

// export middleware that returns stringified HTML from server
export default (req, res) => {
  const injectHTML = (data, { html, title, meta, body, scripts }) => {
    data = data.replace('<html>', \`<html \${html}>\`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace('</head>', \`\${meta}</head>\`);
    data = data.replace(
      '<div id="root"></div>',
      \`<div id="root">\${body}</div>\`
    );
    data = data.replace('</body>', scripts.join('') + '</body>');

    return data;
  };

  fs.readFile(
    path.resolve(__dirname, '../\${input.rootHtml}'),
    'utf8',
    (err, htmlData) => {
      if (err) {
        console.error('Read error', err);
        return res.status(404).end();
      }

      // define context for react router
      const context = {};
      // define modules for react loadable
      const modules = [];

      frontloadServerRender(() =>
        renderToString(
          <Loadable.Capture report={m => modules.push(m)}>
            <StaticRouter location={req.url} context={context}>
              <Frontload isServer>
                <App />
              </Frontload>
            </StaticRouter>
          </Loadable.Capture>
        )
      ).then(routeMarkup => {
        if (context.url) {
          // If context has a url property, then we need to handle a redirection in Redux Router
          res.writeHead(302, {
            Location: context.url
          });

          res.end();
        } else {
          // Otherwise, we carry on...

          // Let's give ourself a function to load all our page-specific JS assets for code splitting
          const extractAssets = (assets, chunks) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
              .map(k => assets[k]);

          // Let's format those assets into pretty <script> tags
          const extraChunks = extractAssets(manifest, modules).map(
            c => \`<script type="text/javascript" src="/\${c}"></script>\`
          );

          // We need to tell Helmet to compute the right meta tags, title, and such
          const helmet = Helmet.renderStatic();

          // Pass all this nonsense into our HTML formatting function above
          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body: routeMarkup,
            scripts: extraChunks
          });

          // We have all the final HTML, let's send it to the user already!
          res.send(html);
        }
      });
    }
  );
}`;
};