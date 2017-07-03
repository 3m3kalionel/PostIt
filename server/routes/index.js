import authControllers from '../controllers';

const usersController = authControllers.users;
const loginController = authControllers.login;
const groupsController = authControllers.group;
const messagesController = authControllers.messages;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/user/signin', loginController.login);

  app.post('/api/user/signup', usersController.create);

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
