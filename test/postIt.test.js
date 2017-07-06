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

const group1 = {
  name: 'MMA Fans',
  description: 'Meeting spot for Mixed Martial Arts diehards!!',
  email: 'mighty.mouse@ufc.com'
};

const groupMessage = {
  content: 'Just a test message'
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
        if (err) { return done(err); }
        done();
      });
  });
});

describe('New broadcast group', () => {
  beforeEach((done) => {
    models.Group.destroy({
      where: { },
      truncate: true,
      cascade: true
    })
      .then(() => done());
  });

  it('should create a new group', (done) => {
    request(app).post('/api/group')
      .send(group1)
      .expect((res) => {
        expect(res.body).to.be.an.instanceof(Object);
        expect(201);
        expect(res.body.name).to.equal(group1.name);
        expect(res.body.description).to.equal(group1.description);
        expect(res.body).to.have.property('id');
      })
      .end((err, res) => {
        if (err) { return done(err); }
        done();
      });
  });
});

describe('Broadcast group', () => {
  it('should be unique', (done) => {
    request(app).post('/api/group')
      .send(group1)
      .expect((res) => {
        expect(400);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('New group message', () => {
  beforeEach((done) => {
    models.Message.destroy({
      where: { },
      truncate: true,
      cascade: true
    })
      .then(() => done());
  });

  it('should post to a group', (done) => {
    request(app).post('/api/group/1/message')
      .send(groupMessage)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.groupId).to.equal(groupMessage.groupId);
        expect(res.body.content).to.equal(groupMessage.content);
        done();
      });
  });
});

describe('Message model', () => {
    const message = {
    content: 'wassup peeps',
    groupId: 1,
    userId: 1
  }

  beforeEach((done) => {
    models.Message.destroy({
      where: { },
      truncate: true,
      cascade: true
    })
      .then(() => done());
  });

  it('should create a message', (done) => {
    models.Message.create(message).then((message) => {
      expect(message).content.to.equal('wassup peeps');
      done();
    })
  });
});

describe('User model', () => {
    const user2 = {
    username: '3m3ka',
    password: '12345',
    email: 'emeka@andela.com'
  };

  beforeEach((done) => {
    models.User.destroy({
      where: { },
      truncate: true,
      cascade: true
    })
      .then(() => done());
  });

  it('should create a new user', (done) => {
    models.User.create(user2).then((user) => {
      expect(user).name.to.equal('3m3ka');
      done();
    });
  });
});
