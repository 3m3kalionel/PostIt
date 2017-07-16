import models from './../models';

const User = models.User;

module.exports = {
  signin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const validator = /[a-z0-9]{8,20}/gi;

    if (username !== undefined && username.trim().length === 0) {
      return res.status(400).json({
        signinError: 'Username can\'t be empty'
      });
    } else if (!password) {
      return res.status(400).json({
        signinError: 'Please enter a password'
      });
    }
    else if (!validator.test(password) || password.length > 20) {
      return res.status(400).json({
        signinError: 'Your password length should be between EIGHT and TWENTY characters'
      });
    }
    next();
  },

  signup(req, res, next) {
    const email = req.body.email;

    if (!email || email.trim().length === 0) {
      return res.status(400).json({
        signupError: 'email field can\'t be empty'
      });
    }
    next();
  },

  validUser(req, res, next) {
    const userId = req.params.userid;
    User.findOne({ where: { id: userId } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            errorMessage: 'user does not exist'
          });
        }
        next();
      }).catch(error => res.status(500).send(error));
  }
};
