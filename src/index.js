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
    // read from the html file specified by the user
    fs.readFile(config.html, 'utf-8', (err, data) => {
      if (err) throw err;
      /*
        (?<=<div id="x">)(.*?)(?=<\/div>)
        this regular expression selects all content within the div with an id of "x"
        (?<= x) specifies the starting point for the regEx match
          - in this case, it looks for all content after <div id="x">
        (?=<\/div>) specifies the ending point for the regEx match
          - in this case, it stops at a closing div tag (</div>)
          - the '\' is an escape character
        (.*?) specifies to stop on the first match specified by (?=)
          - in this case, it will stop on the first </div> it encounters
      */
      const regEx = new RegExp(`(?<=<div id="${config.id}">)(.*?)(?=<\/div>)`);
      // find the contents of the div with the id specified by the user
      // match returns an array that matches the regex, join is to turn it back into a string
      const inner = data.match(regEx).join('');
      // finds the div with config.id and all of its inner contents
      const innerRegEx = new RegExp(`<div id="${config.id}">${inner}<\/div>`);
      // replaces the contents of the div with the SSR component
      const document = data.replace(innerRegEx, `<div id="${config.id}">${ssrComponent}</div>`);
      res.write(document);
      res.end();
    });
  }
};

module.exports = {
  init,
  serve
}