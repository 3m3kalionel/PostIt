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
            email: newUser.email
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

  googleSignup(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          User.create(user)
            .then((googleUser) => {
              const token = jwt.sign({
                googleUser
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '2 days'
              });
              return res.status(201).json({
                user: {
                  id: googleUser.id,
                  username: googleUser.userame,
                  email: googleUser.email
                },
                token
              });
            })
            .catch(error => res.status(500).json({
              success: false,
              message: 'Internal server error'
            }));
        } else {
          const token = jwt.sign({
            user
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '2 days'
          });
          return res.status(200).json({
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            },
            token
          });
        }
      });
  },

  listAll(req, res) {
    const query = req.query.q;

    if (!query) {
      res.status(200).json([]);
    } else {
      User.findAll({
        where: {
          username: {
            $iLike: `%${query}%`
          }
        },
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
    User.findOne({
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
      console.log('A PASSWORD JUST ARRIVED', req.body);
      const password = bcrypt.hashSync(req.body.newPassword, user.salt);
      user.update({ password });
    }).catch(error => res.status(500).json({
      success: false,
      message: error.message
    }));
  }
};
