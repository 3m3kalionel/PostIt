import helpers from '../helpers';
import user from '../models';
import bcrypt from 'bcrypt';

const User = user.User;

module.exports = {
  create(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //check db for user with the username(done)
    // if it exists, return a message/ error - user already exists
    // 

    User.find({
      where: {
        username
      }
    }).then(() => {
      User.sync({ force: false }).then(() => {
        User
          .create({
            username,
            password: hash,
            email,
            salt
          })
          .then(newUser => res.status(201).send(newUser))
          .catch((error) => {
            res.status(400).send(error.errors[0].message);
          });
      }).catch(error => res.status(400).send(error.name));
    });
  }
};

