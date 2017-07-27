import path from 'path';

const PUBLIC_PATH = path.join(__dirname, 'public');
const SRC_DIRECTORY = path.join(__dirname, 'client');

export default {
  entry: path.join(SRC_DIRECTORY, 'index.js'),
  output: {
    path: PUBLIC_PATH,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.jsx"', '.css']
  }
};
