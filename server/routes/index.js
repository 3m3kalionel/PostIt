import usersControllers from '../controllers';
import loginControllers from '../controllers';

const usersController = usersControllers.users;
const loginController = loginControllers.login;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/user/signin', loginController.login);

  app.post('/api/user/signup', usersController.create);

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
};
