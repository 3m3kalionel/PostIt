import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const http = require('http');

const port = parseInt(process.env.PORT, 10) || 8080;
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// An API route that allow users create broadcast groups:
// POST: /api/group
app.post('/api/group', (req, res) => res.send('Create a group'));


// An API route that allow users add other users to groups:
app.post('/api/group/:groupid/user', (req, res) => res.send(`Added new user to ${req.params.groupid}.`));


// An API route that allows a logged in user post messages to created groups:
app.post('/api/group/:groupid/message', (req, res) => res.send(`Thanks for posting ur message to ${req.params.groupid}`));

// An API route that allows a logged in user retrieve messages that have been
// posted to groups he/she belongs to:
app.get('/api/group/:groupid/messages', (req, res) => res.send(`Welcome! here are the messages for ${req.params.groupid}`));

// Root route
app.get('*', (req, res) => res.send('Sorry, the page u requested does not exist'));


const server = http.createServer(app);
server.listen(port, () => console.log('The server is running on port 8080'));
