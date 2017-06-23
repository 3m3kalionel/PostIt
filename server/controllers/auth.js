import passport from 'passport';
import passportLocal from 'passport-local';
import user from '../models';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  user.User.findOne({
    where: {
      username
    }
  }).then((users, err) => {
    if (!users) {
      return done(null, false, { message: 'Incorrect username' });
    }
    if (users.password !== req.body.password) {
      return done(null, false, { message: ' Incorrect password.' });
    }
    return done(null, users);
  }).catch(err => done(err));
}
));

module.exports = passport;

