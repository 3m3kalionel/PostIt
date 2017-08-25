import dotenv from 'dotenv';
import authControllers from '../controllers';
import authenticate from '../middleware/authenticate';
import validateGroup from '../middleware/validateGroup';
import validateUser from '../middleware/validateUser';
import validateMessage from '../middleware/validateMessage';

import path from 'path';

const publicPath = path.resolve(__dirname, '../../public');
const usersController = authControllers.users;
const loginController = authControllers.login;
const groupsController = authControllers.group;
const messagesController = authControllers.messages;

dotenv.config();

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).json({
    message: 'Welcome to the Postit API!',
  }));

  app.post('/api/user/signin', validateUser.signin, loginController.login);

  app.post('/api/user/signup', validateUser.signup, validateUser.signin, usersController.create);

  // An API route that allow users create broadcast groups:
  // POST: /api/group
  app.post('/api/group', authenticate, validateGroup.name, validateGroup.isEmptyContent, groupsController.create);

  // An API route that allow users add other users to groups:
  app.post('/api/group/:groupid/user', authenticate, validateGroup.validGroup, validateGroup.isGroupMember, validateGroup.user, groupsController.addNewUser);


  // An API route that allows a logged in user post messages to created groups:
  app.post('/api/group/:groupid/message', authenticate, validateGroup.isGroupMember, validateMessage.isNull, validateGroup.validGroup, messagesController.create);

  // An API route that allows a logged in user retrieve messages that have been
  // posted to groups he/she belongs to:
  app.get('/api/group/:groupid/messages', authenticate, validateGroup.validGroup, validateGroup.isGroupMember, groupsController.list);

  // An API route that allows a logged in user list users in a group that he/she belongs to
  app.get('/api/group/:groupid/users', authenticate, validateGroup.validGroup, validateGroup.isGroupMember, groupsController.listMembers);

  // An API route that allows a logged in user search for a user
  app.get('/api/users', usersController.listAll);

  // An API route that allows a logged in user list all groups that he/she belongs to
  app.get('/api/groups', authenticate, groupsController.listGroups);

  // Root route
  app.get('*', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));
};
