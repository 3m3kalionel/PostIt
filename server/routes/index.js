import dotenv from 'dotenv';
import authControllers from '../controllers';
import authenticate from '../middleware/authenticate';
import validateGroup from '../middleware/validateGroup';


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

  // An API route that allow users create broadcast groups:
  // POST: /api/group
  app.post('/api/group', authenticate, validateGroup.name, groupsController.create);

  // An API route that allow users add other users to groups:
  app.post('/api/group/:groupid/user', authenticate, validateGroup.name, validateGroup.user, groupsController.addNewUser);


  // An API route that allows a logged in user post messages to created groups:
  app.post('/api/group/:groupid/message', authenticate, validateGroup.validGroup, messagesController.create);

  // An API route that allows a logged in user retrieve messages that have been
  // posted to groups he/she belongs to:
  app.get('/api/group/:groupid/messages', authenticate, groupsController.list);

  // Root route
  app.get('*', (req, res) => res.send('Sorry, the page u requested does not exist'));
};
