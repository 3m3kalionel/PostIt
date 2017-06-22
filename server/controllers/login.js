import passport from './auth';

module.exports = {
  login(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(400).send(user) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.status(200).send('logged in');
      });
    })(req, res, next);
  }
};
