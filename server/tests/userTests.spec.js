import chai from 'chai';
import request from 'supertest';
import winston from 'winston';
import bcrypt from 'bcrypt';

import app from '../../app';
import models from '../../server/models';
import user from './helpers/users';
import PromiseBased from './helpers/promisify';


const salt = bcrypt.genSaltSync(10);

const hashedUsers = ([
  user.validUserIbrahim,
  user.validUserConor,
  user.validUserVictor
])
  .map((thisUser) => {
    const returnedUser = {
      ...thisUser,
      salt,
      password: bcrypt.hashSync(thisUser.password, salt)
    };
    return returnedUser;
  });

const expect = chai.expect;
let userTokenLionel;

const promisify = new PromiseBased(app, request);

describe('Sign up route', () => {
  before((done) => {
    models.sequelize.sync({ force: true })
      .then(() => models.User.bulkCreate(hashedUsers))
      .then(() => promisify.signin(user.validUserIbrahim))
      .then((token) => {
        userTokenLionel = token;
        return promisify.signin(user.validUserConor);
      }, (err) => {
        winston.error('<< test errors >>', err);
      })
      .then(() => promisify.signin(user.validUserVictor))
      .then(() => {
        done();
      })
      .catch((err) => {
        winston.error('<< test errors >>', err);
        done();
      });
  });
  it('creates a user on signup', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.validUserOkoro)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.user.username).to.equal(user.validUserOkoro.username);
        done();
      });
  });

  it('throws an error if username already exists', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.existingUsernameIbrahim)
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

  it('throws an error if username is an empty string', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.emptyStringUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter your username');
        done();
      });
  });

  it('throws an error if email already exists', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.existingEmail)
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
        .send(user.emptyStringEmailUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter your email');
          done();
        });
    });

  it('throws an error if provided email address is an empty string',
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

  it('rejects user with a password of less than 8 characters', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.fewCharPasswordUser)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.Error).to.equal(
          'Your password length should be between EIGHT and TWENTY characters');
        done();
      });
  });

  it('rejects user with a password of more than 20 characters', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.longPasswordCharUser)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.Error).to.equal(
          'Your password length should be between EIGHT and TWENTY characters');
        done();
      });
  });

  it('throws an error if no phone number is supplied', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.emptyStringPhoneNumberUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter your phone number');
        done();
      });
  });

  it('throws an error if phone number is an empty string', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(user.noPhoneNumber)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter your phone number');
        done();
      });
  });
});

describe('Authentication route', () => {
  it('logs in registered users', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send(user.validUserIbrahim)
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
  it('allows a logged in user search all users in the application', (done) => {
    request(app)
      .get('/api/v1/users/search')
      .set('x-access-token', userTokenLionel)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceof(Object);
        done();
      });
  });

  it(`throws an error if a non-integer limit value is entered when
   searching for users`, (done) => {
      request(app)
        .get('/api/v1/users/search?username=m&limit=boy')
        .set('x-access-token', userTokenLionel)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.message).to.equal('Please enter a VALID limit value');
          done();
        });
    });

  it(`throws an error if a non-integer offset value is entered when
   searching for users`, (done) => {
      request(app)
        .get('/api/v1/users/search?username=m&offset=boy')
        .set('x-access-token', userTokenLionel)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.message).to.equal(
            'Please enter a VALID offset value');
          done();
        });
    });
});

