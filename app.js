import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import http from 'http';
import routes from './server/routes';
import models from './server/models';

models.sequelize.sync();

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
routes(app);

const server = http.createServer(app);
server.listen(port, () => console.log('The server is running on port 8080'));

module.exports = server;
