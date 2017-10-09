import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import http from 'http';
import path from 'path';
import webpack from 'webpack';
import winston from 'winston';
import webpackConfig from './webpack.config.dev';
import routes from './server/routes';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;
const publicPath = path.resolve(__dirname, '/public'); // eslint-disable-line

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  const webpackCompiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(webpackCompiler, { // eslint-disable-line
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(webpackCompiler, { // eslint-disable-line
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 2 * 1000
  }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
} else {
  app.use(express.static('public'));
}

app.use(passport.session());
routes(app);

const server = http.createServer(app);
server.listen(port, () => winston.log('The server is running on port 8080'));

module.exports = server;
