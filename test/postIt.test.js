import chai from 'chai';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../app';
import models from '../server/models';

dotenv.config();
process.env.NODE_ENV = 'test';

const expect = chai.expect;

const user1 = {
  username: 'dj',
  password: '12345',
  email: 'mighty.mouse@ufc.com'
};

const unregisteredUser = {
  usename: 'falseUser',
  password: '12345',
  email: 'unsignedUser@gmail.com'
};

describe('signup route', () => {
  beforeEach((done) => {
    models.sequelize.sync().then(() => {
      models.User.destroy({
        where: { },
        truncate: true,
        cascade: true
      })
        .then(() => done());
    });
  });

  it('should create a new user', (done) => {
    request(app).post('/api/user/signup')
      .send(user1)
      .expect((res) => {
        console.log(res.body);
        expect(res.body).to.be.an.instanceof(Object);
        expect(201);
        expect(res.body.username).to.equal(user1.username);
        expect(res.body.email).to.equal(user1.email);
      })
      .end((err, res) => {
        if (err) {return done(err); }
        done();
      });
  });
});


describe('signin route', () => {
  it('should sign in an existing user', (done) => {
    request(app).post('/api/user/signin')
      .send(user1)
      .expect((res) => {
        expect(res.body).to.be.an.instanceof(Object);
        expect(200);
        expect(res.text).to.equal('logged in');
      })
      .end((err, res) => {
        if (err) { 
          // console.log(res);
          return done(err); }
        done();
      });
  });

  it('should reject an unregistered user', (done) => {
    request(app).post('/api/user/signin')
      .send(unregisteredUser)
      .expect((res) => {
        expect(404);
        expect(res.text).to.equal('false');
      })
      .end((err, res) => {
        if (err) { 
          // console.log(res);
          return done(err);
        }
        done();
      });
  });
});
