const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

// const PUBLIC_PATH = path.join(__dirname, 'public');
const SRC_DIRECTORY = path.join(__dirname, 'client');


module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(SRC_DIRECTORY, 'Index.jsx'),
    path.join(SRC_DIRECTORY, 'sass/common.scss')
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss', '.css'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      minimize: true,
      sourceMap: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader?sourceMap',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
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
      // {
      //   test: /\.scss?$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      // {
      //   test: /\.css?$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader?importLoaders=1' })
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
    ],
  }
};
