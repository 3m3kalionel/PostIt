import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from './auth';

dotenv.config();

module.exports = {
  login(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) { return res.send(err); }
      if (!user) { return res.status(404).send(user); }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        const token = jwt.sign({
          username: user.username,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2 days'
        });
        res.status(201).json({
          user,
          tok: token
        });
        return res.status(200).send('logged in');
      });
    })(req, res, next);
  }
};
