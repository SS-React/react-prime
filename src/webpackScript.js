const getWebpackScript = (entryFile, outputFile) => `
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: path.join(__dirname, '../${entryFile}'),
  output: {
    filename: '${outputFile}',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', {
              target: { browsers: ['last 2 versions'] }
            }]
          ]
        }
      }
    ]
  },
  externals: [webpackNodeExternals()]
}`;

module.exports = {
  getWebpackScript,
};