import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import http from 'http';
import routes from './server/routes';
// import models from './server/models';

import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.dev';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;
const publicPath = path.resolve(__dirname, '/public');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  const webpackCompiler = webpack(webpackConfig);
  const webpackDevMiddlewareConfig = webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath
  });
  app.use(webpackDevMiddlewareConfig);
}
app.use(express.static(publicPath)); // set up our public path for our app

app.use(passport.session());
routes(app);

const server = http.createServer(app);
server.listen(port, () => console.log('The server is running on port 8080'));

module.exports = server;
