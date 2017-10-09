import chai from 'chai';
import request from 'supertest';
import bcrypt from 'bcrypt';
import winston from 'winston';
import app from '../app';
import models from '../server/models';
import group from './helpers/groups';
import user from './helpers/users';
import message from './helpers/messages';


const salt = bcrypt.genSaltSync(10);

const hashedUsers = ([user.validUser1, user.validUser2, user.validUser3,
  user.validUser10])
  .map((thisUser) => {
    const returnedUser = {
      ...thisUser,
      salt,
      password: bcrypt.hashSync(thisUser.password, salt)
    };
    return returnedUser;
  });

const expect = chai.expect;
let userToken;
let userToken2;
let userToken3;
let userToken10;

const promisify = currentUser => new Promise((resolve) => {
  request(app)
    .post('/api/v1/user/signin')
    .send(currentUser)
    .end((err, res) => {
      resolve(res.body.token);
    });
});

describe('group route', () => {
  before((done) => {
    models.sequelize.sync({ force: true })
      .then(() => models.User.bulkCreate(hashedUsers))
      .then(() => promisify(user.validUser1))
      .then((token) => {
        userToken = token;
        return promisify(user.validUser2);
      }, (err) => {
        winston.log(err, 'this is an error');
      })
      .then((token) => {
        userToken2 = token;
        return promisify(user.validUser3);
      })
      .then((token) => {
        userToken3 = token;
        return promisify(user.validUser10);
      })
      .then((token) => {
        userToken10 = token;
        done();
      })
      .catch((err) => {
        winston.log(err, 'these are the errors we have');
        done();
      });
  });

  it('allows a user create a broadcast group', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-access-token', userToken)
      .send(group.validGroup1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Group created');
        expect(res.body.group.name).to.equal(group.validGroup1.name);
        done();
      });
  });

  it('allows a user create a broadcast group', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-access-token', userToken)
      .send(group.validGroup2)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Group created');
        expect(res.body.group.name).to.equal(group.validGroup2.name);
        done();
      });
  });

  it('allows a user create a broadcast group', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-access-token', userToken2)
      .send(group.validGroup3)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Group created');
        expect(res.body.group.name).to.equal(group.validGroup3.name);
        done();
      });
  });

  it('allows a logged in user add another user to a group', (done) => {
    request(app)
      .post('/api/v1/group/3/user')
      .set('x-access-token', userToken2)
      .send({ userId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('ibrahim added to group');
        done();
      });
  });

  it('throws an error if group name already exists', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-access-token', userToken)
      .send(group.validGroup1)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Group name already in use');
        done();
      });
  });

  it('throws an error if group name is an empty string', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-access-token', userToken)
      .send(group.emptyStringGroupName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter a group name');
        done();
      });
  });

  it('throws an error if the group has no description', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-access-token', userToken)
      .send(group.noDescriptionGroupName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please provide a description'
        + ' about the group');
        done();
      });
  });

  it('allows a logged in user add another user to a group', (done) => {
    request(app)
      .post('/api/v1/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('conor added to group');
        done();
      });
  });

  it('allows a logged in user add another user to a group', (done) => {
    request(app)
      .post('/api/v1/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: 3 })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('jon added to group');
        done();
      });
  });

  it('throws an error if no userId is provided', (done) => {
    request(app)
      .post('/api/v1/group/2/user')
      .set('x-access-token', userToken)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Please enter a VALID userId');
        done();
      });
  });

  it('throws an error if new member\'s id is not a number', (done) => {
    request(app)
      .post('/api/v1/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: '235t' })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Please enter a VALID userId');
        done();
      });
  });

  it('throws an error if a non-group member adds a user', (done) => {
    request(app)
      .post('/api/v1/group/3/user')
      .set('x-access-token', userToken10)
      .send({ userId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('not a member of this group');
        done();
      });
  });

  it('throws an error if a group member is re-added', (done) => {
    request(app)
      .post('/api/v1/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: 3 })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('user already exists');
        done();
      });
  });

  it('throws an error if an unregistered member is added', (done) => {
    request(app)
      .post('/api/v1/group/1/user')
      .set('x-access-token', userToken)
      .send({ userId: 100 })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('user does not exist');
        done();
      });
  });


  it('throws an error if a non-logged-in tries to access a route', (done) => {
    request(app)
      .post('/api/v1/group')
      .send(group.validGroup2)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('No token provided.');
        done();
      });
  });

  it('allows a logged in user to post messages to created groups', (done) => {
    request(app)
      .post('/api/v1/group/1/message')
      .set('x-access-token', userToken)
      .send(message.validMessage1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message.content).to.equal(message.validMessage1.content);
        done();
      });
  });

  it('allows a logged in user to post messages to created groups', (done) => {
    request(app)
      .post('/api/v1/group/3/message')
      .set('x-access-token', userToken2)
      .send(group.validMessage2)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message.content).to.equal(group.validMessage2.content);
        done();
      });
  });

  it('throws an error when a user posts a message of empty spaces', (done) => {
    request(app)
      .post('/api/v1/group/3/message')
      .set('x-access-token', userToken2)
      .send({ content: '' })
      .end((err, res) => {
        expect(res.body.message).to.equal('Please enter a message');
        done();
      });
  });

  it('throws an error if a user posts an empty message', (done) => {
    request(app)
      .post('/api/v1/group/3/message')
      .set('x-access-token', userToken2)
      .send({ })
      .end((err, res) => {
        expect(res.body.message).to.equal('Please enter a message');
        done();
      });
  });

  it('throws an error if a non-group member posts a message', (done) => {
    request(app)
      .post('/api/v1/group/1/message')
      .set('x-access-token', userToken10)
      .send(group.validMessage1)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('not a member of this group');
        done();
      });
  });

  it('allows a user retrieve all the messages in groups he/she belongs to',
    (done) => {
      request(app)
        .get('/api/v1/group/3/messages')
        .set('x-access-token', userToken2)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Array);
          done();
        });
    });

  it('allows a logged in user see all members of groups he/she belongs to',
    (done) => {
      request(app)
        .get('/api/v1/group/3/users')
        .set('x-access-token', userToken2)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Array);
          done();
        });
    });

  it('prevents a non-group member from retrieving group messages', (done) => {
    request(app)
      .get('/api/v1/group/1/messages')
      .set('x-access-token', userToken10)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('not a member of this group');
        done();
      });
  });

  it('prevents a non-group member from listing out group members', (done) => {
    request(app)
      .get('/api/v1/group/1/users')
      .set('x-access-token', userToken10)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('not a member of this group');
        done();
      });
  });

  it('prevents a non-logged-in user from listing out group members', (done) => {
    request(app)
      .get('/api/v1/group/1/users')
      .set('x-access-token', '88887hg')
      .end((err, res) => {
        expect(res.body.message).to.equal('Failed to authenticate token');
        done();
      });
  });

  it('throws an error if the group id is invalid', (done) => {
    request(app)
      .get('/api/v1/group/100/users')
      .set('x-access-token', userToken2)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('group does not exist');
        done();
      });
  });

  it('allows a logged in user list all groups he/she belongs to', (done) => {
    request(app)
      .get('/api/v1/groups')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceof(Array);
        done();
      });
  });
});
