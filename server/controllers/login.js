import passport from './auth';

module.exports = {
  login(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) { return res.status(404).send(user); }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        return res.status(200).send('logged in');
      });
    })(req, res, next);
  }
};
