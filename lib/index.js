/**
 * Function that returns a string to make an index file for the SSR version of the user's app
 */

const index = () => {
return `const md5File = require('md5-file');
const path = require('path');

// Ignore CSS styles imported on load
const ignoreStyles = require('ignore-styles');
const register = ignoreStyles.default;

// When running locally these will load from a standard import
// When running on the server, we want to load via their hashed version in the build folder
const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg'];

// Override the default style ignorer, also modifying all image requests
register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!extensions.find(f => filename.endsWith(f))) {
    // If we find a style
    return ignoreStyles.noOp();
  }
  const hash = md5File.sync(filename).slice(0, 8);
  const bn = path.basename(filename).replace(/(\\.\\w{3})$/, \`.\${hash}$1\`);
  
  mod.exports = \`/static/media/\${bn}\`;
});

// require babel to transpile JSX
// allow imports and code splitting through plugins
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node',
    'react-loadable/babel'
  ]
});

// import the server
require('./server');`;
};

module.exports = index;
