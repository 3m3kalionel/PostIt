import chai from 'chai';
import request from 'supertest';
import mocha from 'mocha';
import app from '../app';
import models from '../server/models';
import user from './helpers/users';

const expect = chai.expect;

// user signup
// valid usernames, unique usernames, not null username entries
// correct and incorrect passwords
// validate emails - not null, unique and valid patterns
// password length

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('sign up route', () => {
  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.validUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('takes a unique username', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.validUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('username must be unique');
        done();
      });
  });

  it('rejects a user without a usernme', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.nullUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('username cannot be null');
        done();
      });
  });

  it('rejects a user with an existing email', (done) => {
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
        // expect(res.body.loginError).to.equal('email cannot be null');
        done();
      });
  });

  it('takes a unique username', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.validUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.loginError).to.equal('username must be unique');
        done();
      });
  });

  it('disallows creation of a user with password less than 8 characters', (done) => {
    request(app)
      .post('/api/user/signup')
      .send(user.lessPasswordChar)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.signupError).to.equal('Your password length should be between EIGHT and TWENTY characters');
        done();
      });
  });
});
