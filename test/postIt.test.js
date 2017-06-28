import chai from 'chai';
import request from 'supertest';
import app from '../app';

const expect = chai.expect;

const user1 = {
  username: 'dj',
  password: '12345',
  email: 'mighty.mouse@ufc.com'
};

describe('signup route', () => {
  // beforeEach(function() {
    
  // });

  it('should create a new user', (done) => {
    request(app).post('/api/user/signup')
      .send(user1)
      .expect((res) => {
        expect(res.body).to.be.an.instanceof(Object);
        expect(201);
        expect(res.body.username).to.equal(user1.username);
        expect(res.body.email).to.equal(user1.email);        
      })
      .end((err, res) => {
        if (err) { return done(err); }
        done();
      });
  });
});
