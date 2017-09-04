import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from './auth';

dotenv.config();

module.exports = {
  login(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) { return res.status(500).send(err); }
      if (!user) { return res.status(404).send(user); }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        const token = jwt.sign({
          username: user.username,
          email: user.email,
          id: user.id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2 days'
        });
        const { id, username, phone, email } = user;
        res.status(200).json({
          status: `${req.body.username} successfully logged in`,
          user: { id, username, email, phone },
          token
        });
      });
    })(req, res, next);
  }
};
