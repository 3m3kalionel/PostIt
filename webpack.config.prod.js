const path = require('path');

const PUBLIC_PATH = path.join(__dirname, 'public');
const SRC_DIRECTORY = path.join(__dirname, 'client');
module.exports = {
  entry: path.join(SRC_DIRECTORY, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  }
};
