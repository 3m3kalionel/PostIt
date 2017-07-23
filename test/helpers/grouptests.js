import chai from 'chai';
import request from 'supertest';
import mocha from 'mocha';
import app from '../app';
import models from '../server/models';
import group from './helpers/groups';
import user from './helpers/users';

const expect = chai.expect;
let userToken;
let userToken2;
let userToken3;
let userToken10;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('group route', () => {
  it('logs in a user', (done) => {
    request(app)
      .post('/api/user/signin')
      .send(user.validUser1)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  it('logs in a user', (done) => {
    request(app)
      .post('/api/user/signin')
      .send(user.validUser2)
      .end((err, res) => {
        userToken2 = res.body.token;
        done();
      });
  });

  it('logs in a user', (done) => {
    request(app)
      .post('/api/user/signin')
      .send(user.validUser3)
      .end((err, res) => {
        userToken3 = res.body.token;
        done();
      });
  });

  it('logs in a user', (done) => {
    request(app)
      .post('/api/user/signin')
      .send(user.validUser10)
      .end((err, res) => {
        userToken10 = res.body.token;
        done();
      });
  });

  it('allows a user create a broadcast group', (done) => {
    request(app)
      .post('/api/group')
      .set('x-access-token', userToken)
      .send(group.validGroup1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.group.name).to.equal(group.validGroup1.name);
        done();
      });
  });

  it('allows a user create a broadcast group', (done) => {
    request(app)
      .post('/api/group')
      .set('x-access-token', userToken)
      .send(group.validGroup2)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.group.name).to.equal(group.validGroup2.name);
        done();
      });
  });

  it('allows a user create a broadcast group', (done) => {
    request(app)
      .post('/api/group')
      .set('x-access-token', userToken2)
      .send(group.validGroup3)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.group.name).to.equal(group.validGroup3.name);
        done();
      });
  });

  // create group edge case - duplicate group name error
  it('prevents creating a group with an existing group name', (done) => {
    request(app)
      .post('/api/group')
      .set('x-access-token', userToken)
      .send(group.validGroup1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('Group name already exists');
        done();
      });
  });

  // create group edge case - group name error
  it('prevents creating a group with an empty string name', (done) => {
    request(app)
      .post('/api/group')
      .set('x-access-token', userToken)
      .send(group.emptyStringGroupName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('Please enter a group name');
        done();
      });
  });

  // create group edge case - group description error
  it('prevents creating a group with no description', (done) => {
    request(app)
      .post('/api/group')
      .set('x-access-token', userToken)
      .send(group.noDescriptionGroupName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('Please provide a description about the group');
        done();
      });
  });

  it('allows a logged in user add another user to a group', (done) => {
    request(app)
      .post('/api/group/1/user')
      .set('x-access-token', userToken)
      .send({ userId: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('conor added to group');
        done();
      });
  });

  it('allows a logged in user add another user to a group', (done) => {
    request(app)
      .post('/api/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('conor added to group');
        done();
      });
  });

  it('allows a logged in user add another user to a group', (done) => {
    request(app)
      .post('/api/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: 3 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('jon added to group');
        done();
      });
  });

  // add members edge case - no userId specified
  it('prevents adding a user with no userId', (done) => {
    request(app)
      .post('/api/group/2/user')
      .set('x-access-token', userToken)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('Please specify a user');
        done();
      });
  });

  // add members edge case - no userId specified
  it('prevents adding a user with an alphanumeric id', (done) => {
    request(app)
      .post('/api/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: '235t' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('user does not exist');
        done();
      });
  });

  // add members edge case - adder not a group member  
  it('prevents a non-group member from adding users', (done) => {
    request(app)
      .post('/api/group/3/user')
      .set('x-access-token', userToken10)
      .send({ userId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('not a member of this group');
        done();
      });
  });

  // add members edge case - re-adding a group member
  it('prevents adding an already existing group member', (done) => {
    request(app)
      .post('/api/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: 3 })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('user already exists');
        done();
      });
  });

  // add members edge case - invalid group id
  it('prevents adding an unregistered user', (done) => {
    request(app)
      .post('/api/group/2/user')
      .set('x-access-token', userToken)
      .send({ userId: 100 })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('user does not exist');
        done();
      });
  });


  it('prevents a non-logged-in user from accessing a route', (done) => {
    request(app)
      .post('/api/group')
      .send(group.validGroup2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('No token provided.');
        done();
      });
  });

  it('allows a logged in user to post messages to created groups', (done) => {
    request(app)
      .post('/api/group/1/message')
      .set('x-access-token', userToken)
      .send(group.validMessage1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message.content).to.equal(group.validMessage1.content);
        done();
      });
  });

  it('allows a logged in user to post messages to created groups', (done) => {
    request(app)
      .post('/api/group/1/message')
      .set('x-access-token', userToken2)
      .send(group.validMessage2)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message.content).to.equal(group.validMessage2.content);
        done();
      });
  });

  // post message edge case - empty message
  it('prevents a logged in user from posting empty messages', (done) => {
    request(app)
      .post('/api/group/1/message')
      .set('x-access-token', userToken2)
      .send({ content: '' })
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.errorMessage).to.equal('Please enter a message');
        done();
      });
  });

  // post message edge case - null. no content specified
  it('prevents a logged in user from posting empty messages', (done) => {
    request(app)
      .post('/api/group/1/message')
      .set('x-access-token', userToken2)
      .send({ })
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.errorMessage).to.equal('Please enter a message');
        done();
      });
  });

  // post message edge case - non - member
  it('prevents a non-group member from posting messages to a group', (done) => {
    request(app)
      .post('/api/group/1/message')
      .set('x-access-token', userToken10)
      .send(group.validMessage1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('not a member of this group');
        done();
      });
  });

  it('allows a logged in user retrieve all the messages in groups he/she belongs to', (done) => {
    request(app)
      .get('/api/group/1/messages')
      .set('x-access-token', userToken2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceof(Array);
        done();
      });
  });

  it('allows a logged in user see all members of groups he/she belongs to', (done) => {
    request(app)
      .get('/api/group/1/users')
      .set('x-access-token', userToken2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceof(Array);
        done();
      });
  });

  // list messages edge case - user non-member
  it('prevents a non-group member from listing out group messages', (done) => {
    request(app)
      .get('/api/group/1/messages')
      .set('x-access-token', userToken10)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('not a member of this group');
        done();
      });
  });

  // list members edge case - user non-member
  it('prevents a non-group member from listing out group members', (done) => {
    request(app)
      .get('/api/group/1/users')
      .set('x-access-token', userToken10)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('not a member of this group');
        done();
      });
  });

  // list members edge case - user not logged in
  it('prevents a non-logged-in user from listing out group members', (done) => {
    request(app)
      .get('/api/group/1/users')
      .set('x-access-token', '88887hg')
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.Error).to.equal('Failed to authenticate token.');
        done();
      });
  });

  // list members edge case - invalid group id
  it('throws an error if the group id is invalid', (done) => {
    request(app)
      .get('/api/group/100/users')
      .set('x-access-token', userToken2)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.Error).to.equal('group does not exist');
        done();
      });
  });

  it('allows a logged in user list all the groups he/she belongs to', (done) => {
    request(app)
      .get('/api/groups')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceof(Array);
        done();
      });
  });

  it('responds with a message for a random route', (done) => {
    request(app)
      .get('/api/whateva')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('Sorry, the page u requested does not exist');
        done();
      });
  });

  it('responds with a welcome message for the home route', (done) => {
    request(app)
      .get('/api')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to the Postit API!');
        done();
      });
  });
});

