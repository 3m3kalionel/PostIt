import helpers from '../helpers';
import user from '../models';
import bcrypt from 'bcrypt';

const User = user.User;

module.exports = {
  create(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    User.sync({ force: false }).then(() => {
      User
        .create({
          username: req.body.username,
          password: hash,
          email: req.body.email,
          salt: salt
        })
        .then(newUser => res.status(201).send(newUser))
        .catch(error => res.status(400).send(error));
    });
  }
};

