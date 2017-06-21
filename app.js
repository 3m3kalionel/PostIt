import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from '../server/routes';


const app = express();
const http = require('http');

const port = parseInt(process.env.PORT, 10) || 8080;
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

const server = http.createServer(app);
server.listen(port, () => console.log('The server is running on port 8080'));
