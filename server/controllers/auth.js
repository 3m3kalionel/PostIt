import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import models from '../models';

const LocalStrategy = passportLocal.Strategy;
const User = models.User;

/**
  * creates a token using the user's id
  * @param {object} id
  * @returns {undefined}
  */
passport.serializeUser((sessionUser, done) => {
  done(null, sessionUser.id);
});


/**
  * expires the user id token
  * @param {object} id
  * @returns {undefined}
  */
passport.deserializeUser((id, done) => {
  User.findById(id, (err, sessionUser) => done(err, sessionUser));
});

/**
  * authenticates a user via local strategy using his username and password 
  * @param {object} id
  * @returns {undefined}
  */
passport.use(new LocalStrategy({ passReqToCallback: true },
  (req, username, password, done) => {
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

