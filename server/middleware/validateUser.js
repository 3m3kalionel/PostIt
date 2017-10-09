import models from './../models';

const User = models.User;

export default {
  /**
  * Checks if any entered input is empty
  * @param {object} req
  * @param {string} req.body.username
  * @param {string} req.body.password 
  * @param {object} res
  * @param {function} next
  * @param {string} req.body.name
  * @returns {object} response object containing a success status and a message
  */
  signin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const validator = /^[a-z0-9]{8,20}$/gi;

    if (!username || username.trim().length === 0) {
      return res.status(400).json({
        message: 'Please enter your username'
      });
    } else if (!password || password.trim().length === 0) {
      return res.status(400).json({
        message: 'Please enter your password'
      });
    } else if (!validator.test(password)) {
      return res.status(422).json({
        Error: 'Your password length should be between EIGHT and TWENTY'
        + ' characters'
      });
    }
    next();
  },

  /**
   * checks if entered input is empty
   * @param {object} req
   * @param {string} req.body.email
   * @param {number} req.body.phone
   * @param {object} res
   * @param {function} next
   * @returns {object} response object containing a success status and a message
   */
  signup(req, res, next) {
    const email = req.body.email;
    const phone = `${req.body.phone}`;

    if (!email || email.trim().length === 0) {
      return res.status(400).json({
        message: 'Please enter your email'
      });
    } else if (isNaN(phone) || phone === undefined ||
    phone.trim().length === 0) {
      return res.status(400).json({
        message: 'Please enter your phone number'
      });
    }
    next();
  },

  /**
   * checks if entered input is empty
   * @param {object} req
   * @param {string} req.params.userid
   * @param {object} res
   * @param {function} next
   * @returns {object} response object containing a success status and a message
   */
  validUser(req, res, next) {
    const userId = req.params.userid;
    User.findOne({ where: { id: userId } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'user does not exist'
          });
        }
        next();
      }).catch(error => res.status(500).send(error));
  }
};
