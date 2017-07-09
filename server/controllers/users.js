import bcrypt from 'bcrypt';
import model from '../models';

const User = model.User;

module.exports = {
  create(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const validator = /[a-z0-9]{8,20}/gi;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    if (!validator.test(password)) {
      return res.status(400).json({
        signupError: 'Your password length should be between EIGHT and TWENTY characters'
      });
    }

    User
      .create({
        username,
        password: hash,
        email,
        salt
      })
      .then(newUser => res.status(201).send(newUser))
      .catch((error) => {
        res.status(400).json({
          loginError: error.errors[0].message
        });
      });
  }
};

