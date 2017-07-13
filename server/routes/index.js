import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authControllers from '../controllers';

const usersController = authControllers.users;
const loginController = authControllers.login;
const groupsController = authControllers.group;
const messagesController = authControllers.messages;

dotenv.config();

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Postit API!',
  }));

  app.post('/api/user/signin', loginController.login);

  app.post('/api/user/signup', usersController.create);

  app.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

  // An API route that allow users create broadcast groups:
  // POST: /api/group
  app.post('/api/group', groupsController.create);

  // An API route that allow users add other users to groups:
  app.post('/api/group/:groupid/user', groupsController.addNewUser);


  // An API route that allows a logged in user post messages to created groups:
  app.post('/api/group/:groupid/message', messagesController.create);

  // An API route that allows a logged in user retrieve messages that have been
  // posted to groups he/she belongs to:
  app.get('/api/group/:groupid/messages', groupsController.list);

  // Root route
  app.get('*', (req, res) => res.send('Sorry, the page u requested does not exist'));
};
