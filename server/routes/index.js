import dotenv from 'dotenv';
import path from 'path';

import authControllers from '../controllers';
import authenticate from '../middleware/authenticate';
import validateGroup from '../middleware/validateGroup';
import validateUser from '../middleware/validateUser';
import validateMessage from '../middleware/validateMessage';

const publicPath = path.resolve(__dirname, '../../public');
const distPath = path.resolve(__dirname, '../../dist');
const usersController = authControllers.users;
const loginController = authControllers.login;
const groupsController = authControllers.group;
const messagesController = authControllers.messages;

dotenv.config();

module.exports = (app) => {
  app.get('/api/v1', (req, res) => res.status(200).json({
    message: 'Welcome to the Postit API!',
  }));

  // An API route that allows users to log into to the application
  app.post('/api/v1/user/signin', validateUser.signin, loginController.login);

  // An API route that allows users to sign up and create accounts
  app.post('/api/v1/user/signup', validateUser.signup, validateUser.signin,
    usersController.createNewUser);

  // An API route that allows users to sign up/sign in via their gmail accounts
  app.post('/api/v1/user/google_auth', usersController.googleAuth);

  // An API route that allow users create broadcast groups:
  app.post('/api/v1/group', authenticate, validateGroup.name,
    validateGroup.isEmptyContent, groupsController.createGroup);

  // An API route that allow users add other users to groups:
  app.post('/api/v1/group/:groupid/user', authenticate,
    validateGroup.validGroup, validateGroup.isGroupMember, validateGroup.user,
    groupsController.addNewUser);


  // An API route that allows a logged in user post messages to created groups:
  app.post('/api/v1/group/:groupid/message', authenticate,
    validateGroup.validGroup, validateGroup.isGroupMember,
    validateMessage.isEmpty, messagesController.createMessage);

  // An API route that allows a logged in user retrieve messages that have been
  // posted to groups he/she belongs to:
  app.get('/api/v1/group/:groupid/messages', authenticate,
    validateGroup.validGroup, validateGroup.isGroupMember,
    groupsController.listMessages);

  // An API route that allows a logged in user list users in a group that he
  // belongs to
  app.get('/api/v1/group/:groupid/users', authenticate,
    validateGroup.validGroup, validateGroup.isGroupMember,
    groupsController.listMembers);

  // An API route that allows a logged in user search for a user
  app.get('/api/v1/users', usersController.listAllUsers);

  // An API route that allows a logged in user list all groups that he
  // belongs to
  app.get('/api/v1/groups', authenticate, groupsController.listGroups);

  // An API route that verifies a registered user that
  // has forgotten his password
  app.post('/api/v1/user/verify', usersController.verifyUser);

  // An API route that allows a user reset his password
  app.post('/api/v1/user/reset/:token', usersController.resetPassword);

  // An API route that allows a user list all users in the application
  app.get('/api/v1/users/search', usersController.searchAllUsers);

  // An API route that allows a user list all groups in the application
  app.get('/api/v1/groups/search',
    authenticate, groupsController.searchAllGroups);

  // Root route
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => res
      .sendFile(path.join(distPath, 'index.html')));
  }

  if (process.env.NODE_ENV === 'development') {
    app.get('*', (req, res) => res
      .sendFile(path.join(publicPath, 'index.html')));
  }
};
