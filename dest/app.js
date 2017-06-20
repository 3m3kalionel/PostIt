'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = require('http');

var port = parseInt(process.env.PORT, 10) || 8080;
app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// An API route that allow users create broadcast groups:
// POST: /api/group
app.post('/api/group', function (req, res) {
  return res.send('Create a group');
});

// An API route that allow users add other users to groups:
// POST: /api/group/<group id>/user
app.post('/api/group/:groupid/user', function (req, res) {
  return res.send('Added new user to ' + req.params.groupid + '.');
});

// An API route that allows a logged in user post messages to created groups:
// POST: /api/group/<group id>/message
app.post('/api/group/:groupid/message', function (req, res) {
  return res.send('Thanks for posting ur message to ' + req.params.groupid);
});

// An API route that allows a logged in user retrieve messages that have been
// posted to groups he/she belongs to:
// GET: /api/group/<group id>/messages
app.get('/api/group/:groupid/messages', function (req, res) {
  return res.send('Welcome! here are the messages for ' + req.params.groupid);
});

app.get('*', function (req, res) {
  return res.send('Sorry, the page u requested does not exist');
});

var server = http.createServer(app);
server.listen(port, function () {
  return console.log('The server is running on port 8080');
});