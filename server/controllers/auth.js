import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import models from '../models';

const LocalStrategy = passportLocal.Strategy;
const User = models.User;

passport.serializeUser((sessionUser, done) => {
  done(null, sessionUser.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, sessionUser) => done(err, sessionUser));
});

passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  User.findOne({
    where: {
      username
    }
  }).then((user) => {
    if (!user) {
      return done({ message: 'Username not found' }, false);
    }
    const reqPasswordHash = bcrypt.hashSync(req.body.password, user.salt);

    if (user.password === reqPasswordHash) {
      return done(null, user);
    }
    return done({ message: 'Username and password do not match' }, false);
  }).catch(err => done(err));
}
));

module.exports = passport;

