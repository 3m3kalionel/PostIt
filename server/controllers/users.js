import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import model from '../models';
import mailVerificationCode from '../middleware/verify';


dotenv.config();
const User = model.User;

module.exports = {
  create(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    if (!req.body.password) {
      return res.status(400).json({
        success: false,
        message: 'Please Input your password'
      });
    }

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
              phone: newUser.phone,
              updatedAt: newUser.updatedAt,
              createdAt: newUser.createdAt
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
            status: `${req.body.username} successfully logged in`,
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
      });
  },

  listAll(req, res) {
    const { username, limit, offset } = req.query;

    if (!req.query) {
      res.status(200).json([]);
    } else {
      User.findAndCountAll({
        where: {
          username: {
            $iLike: `%${username}%`
          }
        },
        limit,
        offset,
        attributes: { exclude: ['password', 'salt', 'createdAt', 'updatedAt', 'verificationCode'] }
      })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(404).json({
            success: false,
            error
          });
        });
    }
  },

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
      mailVerificationCode(user.username, user.email, token);
      res.status(200).json({
        success: true,
        message: 'verification email sent'
      });
    }).catch((error) => {
      res.status(400).json({
        success: false,
        message: 'User not found'
      });
    });
  },


  resetPassword(req, res) {
    const encodedEmail = req.params.token;
    const decode = jwt.decode(encodedEmail);
    const email = decode.email;
    return User.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid verification token'
        });
      }
      const password = bcrypt.hashSync(req.body.newPassword, user.salt);
      return user.update({ password })
        .then(() => {
          res.status(200).json({
            sucess: true,
            message: 'Password reset successfully'
          });
        });
    }).catch(error => res.status(500).json({
      success: false,
      message: error.message
    }));
  }
};
