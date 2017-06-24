import passport from 'passport';
import passportLocal from 'passport-local';
import user from '../models';
import helpers from '../helpers';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((sessionUser, done) => {
  done(null, sessionUser.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, sessionUser) => done(err, sessionUser));
});

passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  user.User.findOne({
    where: {
      username
    }
  }).then((users) => {
    if (!users) {
      return done(null, false, { message: 'Incorrect username' });
    }

    if (!helpers.validate.validatePassword(users.password)) {
      return done(null, false, { message: ' Incorrect password.' });
    }

    return done(null, users);
  }).catch(err => done(err));
}
));

module.exports = passport;

