const User = require('../models').User;

module.exports = {
  create(req, res) {
    User.sync({ force: false }).then(function() {
      return User
        .create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    });
  }
};
