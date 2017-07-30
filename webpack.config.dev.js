import path from 'path';
import webpack from 'webpack';

const PUBLIC_PATH = path.join(__dirname, 'public');
const SRC_DIRECTORY = path.join(__dirname, 'client');


export default {
  entry: [
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.join(SRC_DIRECTORY, 'index.jsx'),
  ],
  output: {
    path: PUBLIC_PATH,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|styl|jpe?g|png|gif|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css?$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
  },

};
