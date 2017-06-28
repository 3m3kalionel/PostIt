import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
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
    // Compare database salt to the hash of incoming password
    const reqPasswordHash = bcrypt.hashSync(req.body.password, users.salt);

    if (users.password === reqPasswordHash) {
      return done(null, users);
    }
    return done(null, false, { message: ' Incorrect password.' });
  }).catch(err => done(err));
}
));

module.exports = passport;

