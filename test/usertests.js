import chai from 'chai';
import request from 'supertest';
import mocha from 'mocha';
import app from '../app';
import models from '../server/models';
import user from './helpers/users';

const expect = chai.expect;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('sign up route', () => {
  //  valid details,

  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.validUser1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.user.username).to.equal(user.validUser1.username);
        done();
      });
  });

  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.validUser2)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.validUser3)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.validUser10)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  // user signup edge cases - username
  // unique usernames, null username entries, empty string usernames

  it('only takes a unique username', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.validUser1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('username must be unique');
        done();
      });
  });

  it('rejects a user without a username', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.nullUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('username cannot be null');
        done();
      });
  });

  it('rejects an empty string username ', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.emptyStringUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.signinError).to.equal('Username can\'t be empty');
        done();
      });
  });


  // user signup edgecases - email
  // validate emails -  not unique email, null emails, and invalid patterns

  it('only accepts a unique email', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.notUniqueEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('email must be unique');
        done();
      });
  });

  it('rejects a user with no email', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.nullEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.signupError).to.equal('email field can\'t be empty');
        done();
      });
  });

  it('rejects a poorly formatted email address', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.poorFormatEmailUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('Invalid email address format');
        done();
      });
  });

  it('rejects a poorly formatted email address', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.poorFormatEmailUser2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('Invalid email address format');
        done();
      });
  });

  it('rejects a poorly formatted email address', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.poorFormatEmailUser3)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('Invalid email address format');
        done();
      });
  });

  // user signup edge cases - password
  it('rejects user with a password of less than 8 characters', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.lessPasswordCharUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.signinError).to.equal('Your password length should be between EIGHT and TWENTY characters');
        done();
      });
  });
});

describe('Authentication route', () => {
  it('logs in registered users', (done) => {
    request(app)
      .post('/api/user/signin')
      .send(user.validUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(`${req.body.username} successfully logged in`);
        done();
      });
    done();
  });

  it('prevents unregistered users from logging in', (done) => {
    request(app)
      .post('/api/user/signin')
      .send(user.rightUsernameWrongPassword)
      .end((err, res) => {
        expect(res.body.message).to.equal('Username and password do not match');
        done();
      });
  });

  it('prevents unregistered users from logging in', (done) => {
    request(app)
      .post('/api/user/signin')
      .send(user.wrongUsername)
      .end((err, res) => {
        expect(res.body.message).to.equal('Username not found');
        done();
      });
  });
});

