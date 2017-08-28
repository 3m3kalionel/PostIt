import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import model from '../models';

dotenv.config();
const User = model.User;

module.exports = {
  create(req, res) {
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
              updatedAt: newUser.updatedAt,
              createdAt: newUser.createdAt
            },
            token
          });
        })
        .catch((error) => {
          console.log(req.body);
          console.log("Error===___=_++_++>>", error);
          res.status(400).json({
            Error: error.errors[0].message
          });
        });
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
        }
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
  }
};
