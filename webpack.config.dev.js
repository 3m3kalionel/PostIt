import path from 'path';
import webpack from 'webpack';

const PUBLIC_PATH = path.join(__dirname, 'public');
const SRC_DIRECTORY = path.join(__dirname, 'client');


export default {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.join(SRC_DIRECTORY, 'index.jsx'),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss', '.css'],
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
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
        test: /\.(eot|ttf|woff2?)$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        },
      },
      {
        test: /\.(svg|jpe?g|png|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]'
        },
      },
      {
        test: /\.scss?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  }
};
