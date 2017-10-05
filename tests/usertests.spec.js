import chai from 'chai';
import request from 'supertest';
import mocha from 'mocha';
import app from '../app';
import models from '../server/models';
import user from './helpers/users';

const expect = chai.expect;

describe('Sign up route', () => {
  before((done) => {
    models.sequelize.sync({ force: true }).then(() => {
      done(null);
    }).catch((errors) => {
      done(errors);
    });
  });
  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.validUser1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.user.username).to.equal(user.validUser1.username);
        done();
      });
  });

  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.validUser2)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.validUser3)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.validUser10)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  // // user signup edge cases - username
  // // unique usernames, null username entries, empty string usernames

  it('throws an error if username already exists', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.existingUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.Error).to.equal('username must be unique');
        done();
      });
  });

  it('throws an error if no username is supplied', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.noUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter your username');
        done();
      });
  });

  it('throws an error if username is empty', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.emptyStringUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter your username');
        done();
      });
  });


  // // user signup edgecases - email
  // // validate emails -  not unique email, null emails, and invalid patterns

  it('throws an error if email already exists', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.notUniqueEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.Error).to.equal('email must be unique');
        done();
      });
  });

  it('throws an error if no email is supplied', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.nullEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter your email');
        done();
      });
  });

  it('throws an error if poorly formatted email address is supplied',
    (done) => {
      request(app)
        .post('/api/v1/user/signup')
        .send(user.poorFormatEmailUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.Error).to.equal('Invalid email address format');
          done();
        });
    });

  it('throws an error if poorly formatted email address is supplied',
    (done) => {
      request(app)
        .post('/api/v1/user/signup')
        .send(user.poorFormatEmailUser2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.Error).to.equal('Invalid email address format');
          done();
        });
    });

  it('throws an error if poorly formatted email address is supplied',
    (done) => {
      request(app)
        .post('/api/v1/user/signup')
        .send(user.poorFormatEmailUser3)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.Error).to.equal('Invalid email address format');
          done();
        });
    });

  // user signup edge cases - password
  it('rejects user with a password of less than 8 characters', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.lessPasswordCharUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.Error).to.equal('Your password length should' +
        ' be between EIGHT and TWENTY characters');
        done();
      });
  });

  it('rejects user with a password of more than 20 characters', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.lessPasswordCharUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.Error).to.equal('Your password length should' +
        ' be between EIGHT and TWENTY characters');
        done();
      });
  });
});

describe('Authentication route', () => {
  it('logs in registered users', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send(user.validUser1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Login successful');
        done();
      });
  });

  it('throws an error if login details do not match', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send(user.rightUsernameWrongPassword)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Username and password do not match');
        done();
      });
  });

  it('throws an error if username is not  found', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send(user.wrongUsername)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Username not found');
        done();
      });
  });
});

describe('Authentication route', () => {
  it('lets a user search for other registered users', (done) => {
    request(app)
      .get('/api/v1/users?username=e&offset=0&limit=3')
      // .send('?username="e"')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // expect(res.body.message).to.equal('Username not found');
        done();
      });
  });
});
