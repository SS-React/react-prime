const getWebpackScript = () => {
return `const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './primeServer.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'primeBundle.js',
    publicPath: '/build'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] }}]
          ],
        },
      },
    ],
  },
  externals: [webpackNodeExternals()]
};
`;
};

module.exports = getWebpackScript;
