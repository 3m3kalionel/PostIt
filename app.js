import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import http from 'http';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config.dev';
import routes from './server/routes';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;
const publicPath = path.resolve(__dirname, '/public');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  const webpackCompiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(webpackCompiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 2 * 1000
  }));
}
app.use(express.static('public'));

app.use(passport.session());
routes(app);

const server = http.createServer(app);
server.listen(port, () => console.log('The server is running on port 8080'));

module.exports = server;
