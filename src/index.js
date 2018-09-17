const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const fs = require('fs');

const config = {};

// userInput is the user information retrieved from the CLI
const init = (userInput) => {
  // html is the path of the HTML file where the React components are rendered
  config.html = userInput.html;
  // App is the path of the top level parent component
  config.App = userInput.App;
  // id is the id attribute on the div that the React components are rendered on
  config.id = userInput.id;
  return config;
};

const serve = (req, res) => {
  const { App } = config;
  // context must be passed to StaticRouter on the server side
  const context = {};
  // use StaticRouter on the server side and BrowserRouter on the client side
  const ssrComponent = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  // redirecting handler for React Router
  if (context.url) {
    res.status = 302;
    res.redirect(context.url);
  } else {
    fs.readFile(config.html, 'utf-8', (err, data) => {
      if (err) throw err;
      // NOTE: this assumes that the div is empty
      const regEx = new RegExp(`<div id="${config.id}"></div>`, 'gi');
      const document = data.replace(regEx, `<div id="${config.id}">${ssrComponent}</div>`);
      res.write(document);
      res.end();
    });
  }
};

module.exports = {
  init,
  serve
}