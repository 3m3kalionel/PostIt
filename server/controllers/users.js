import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import model from '../models';
import notify from '../utils/notify';
import paginate from '../../server/utils/paginate';


dotenv.config();
const User = model.User;

module.exports = {
  /**
   * creates a new user along with a unique json web token
   * @param {object} req
   * @param {object} res
   * @returns {object} user
   */
  createNewUser(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    User.sync({ force: false }).then(() => {
      User
        .create({
          username,
          password: hash,
          email,
          phone,
          salt
        })
        .then((newUser) => {
          const token = jwt.sign({
            username: newUser.username,
            email: newUser.email,
            id: newUser.id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '2 days'
          });
          return res.status(201).json({
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email,
              phone: newUser.phone
            },
            token
          });
        })
        .catch((error) => {
          res.status(400).json({
            Error: error.errors[0].message
          });
        });
    });
  },

  /**
   * creates a user using google details if the user's email does not exist
   * signs a user in if the email exists
   * @param {object} req 
   * @param {object} res
   * @returns {object} response object containing the new user profile
   */
  googleAuth(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((foundUser) => {
        if (foundUser) {
          const token = jwt.sign({
            username: foundUser.username,
            email: foundUser.email,
            id: foundUser.id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '2 days'
          });
          const { id, username, email } = foundUser;
          res.status(200).json({
            message: 'Login successful',
            user: { id, username, email },
            token
          });
        } else {
          const { username, email } = req.body;
          User.sync({ force: false }).then(() => {
            User
              .create({
                username,
                email
              })
              .then((newUser) => {
                const token = jwt.sign({
                  username: newUser.username,
                  email: newUser.email,
                  id: newUser.id
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: '2 days'
                });
                return res.status(201).json({
                  user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                  },
                  token
                });
              })
              .catch((error) => {
                res.status(400).json({
                  Error: error.errors[0].message
                });
              });
          });
        }
      }).catch(error => res.status(500).send(error.message));
  },

  /**
   * searches for users using the query passed in the request object
   * @param {object} req
   * @param {number} req.query.limit
   * @param {number} req.query.offset
   * @param {object} res
   * @returns {object} object containing the total result count and
   * a list of user objects
   */
  listAllUsers(req, res) {
    const { username } = req.query;
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;
    if (isNaN(limit)) {
      res.status(422).json({
        message: 'Please enter a VALID limit value'
      });
    } if (isNaN(offset)) {
      res.status(422).json({
        message: 'Please enter a VALID offset value'
      });
    }
    User.findAndCountAll({
      where: {
        username: {
          $iLike: `%${username}%`
        }
      },
      limit,
      offset,
      attributes: {
        exclude: ['password', 'salt', 'createdAt',
          'updatedAt', 'email', 'phone', 'verificationCode']
      }
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(404).json({
          error
        });
      });
  },

  /**
   * searches for users using the query passed in the request object
   * @param {object} req
   * @param {object} res
   * @returns {object} response object containing success staus and message
   */
  searchAllUsers(req, res) {
    const { username } = req.query;
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;
    if (isNaN(limit)) {
      return res.status(422).json({
        message: 'Please enter a VALID limit value'
      });
    } else if (isNaN(offset)) {
      return res.status(422).json({
        message: 'Please enter a VALID offset value'
      });
    }
    User.findAndCountAll({
      where: {
        username: {
          $iLike: `%${username}%`
        },
      },
      limit,
      offset,
      attributes: {
        exclude: ['password', 'salt', 'createdAt', 'updatedAt']
      }
    }).then((users) => {
      const pagination = paginate({
        limit,
        offset,
        rowCount: users.count,
      });
      return res.status(200).json({
        ...pagination,
        users: users.rows
      });
    });
  },

  // /**
  //  * verifies email validity and sends the user a password reset link
  //  * @param {object} req
  //  * @param {string} req.body.email
  //  * @param {object} res
  //  * @returns {object} response object containing success staus and message
  //  */
  // verifyUser(req, res) {
  //   User.findOne({
  //     where: {
  //       email: req.body.email
  //     }
  //   }).then((user) => {
  //     const token = jwt.sign({
  //       email: user.email
  //     },
  //     process.env.JWT_SECRET,
  //     { expiresIn: '1h' });
  //     mailResetLink(user.username, user.email, token);
  //     res.status(200).json({
  //       message: 'Password reset link has been sent to your email'
  //     });
  //   }).catch(() => {
  //     res.status(400).json({
  //       message: 'User not found'
  //     });
  //   });
  // },

  /**
   * verifies email validity and sends the user a password reset link
   * @param {object} req
   * @param {string} req.body.email
   * @param {object} res
   * @returns {object} response object containing success staus and message
   */
  verifyUser(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      const token = jwt.sign({
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });
      // mailResetLink(user.username, user.email, token);
      const messageBody = { priority: 'none', content: '', members: [user] };
      notify(messageBody, user, token);
      res.status(200).json({
        message: 'Password reset link has been sent to your email'
      });
    }).catch(() => {
      res.status(400).json({
        message: 'User not found'
      });
    });
  },

  /**
   * decodes the url token and sends resets the password if email is valid
   * @param {object} req
   * @param {string} req.params.token
   * @param {string} req.body.newPassword
   * @param {object} res
   * @returns {object} response object containing success staus and message  
   * a list of user objects
   */
  resetPassword(req, res) {
    const encodedEmail = req.params.token;
    const decoded = jwt.verify(encodedEmail, 'andelaishome');
    const email = decoded.email;
    return User.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (!user) {
        return res.status(400).json({
          message: 'Invalid verification token'
        });
      }
      const password = bcrypt.hashSync(req.body.newPassword, user.salt);
      return user.update({ password })
        .then(() => {
          res.status(200).json({
            message: 'Password reset successfully'
          });
        });
    }).catch(error => res.status(422).json({
      message: error.message
    }));
  }
};

