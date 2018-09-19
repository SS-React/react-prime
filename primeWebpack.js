const path = require('path');

module.exports = {
  target: 'node',
  entry: path.join(__dirname, 'cliIndex.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
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
};
