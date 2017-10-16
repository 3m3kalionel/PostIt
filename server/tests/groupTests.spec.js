import chai from 'chai';
import request from 'supertest';
import bcrypt from 'bcrypt';
import winston from 'winston';
import app from '../../app';
import models from '../../server/models';
import group from './helpers/groups';
import user from './helpers/users';
import message from './helpers/messages';


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
let userTokenEmeka;
let userToken3;
let userTokenNonMember;

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
      .then(() => promisify(user.validUserIbrahim))
      .then((token) => {
        userTokenLionel = token;
        return promisify(user.validUserConor);
      }, (err) => {
        winston.error('<< test errors >>', err);
      })
      .then((token) => {
        userToken3 = token;
        return promisify(user.validUserVictor);
      })
      .then((token) => {
        userTokenNonMember = token;
        done();
      })
      .catch((err) => {
        winston.error('<< test errors >>', err);
        done();
      });
  });

  it('allows a user create a group', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-access-token', userTokenLionel)
      .send(group.validGroupMmaJunkies)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Group created');
        expect(res.body.group.name).to.equal(group.validGroupMmaJunkies.name);
        done();
      });
  });

  it('allows a group member add a registered user to a group', (done) => {
    request(app)
      .post('/api/v1/group/1/user')
      .set('x-access-token', userTokenLionel)
      .send({ userId: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('conor added to group');
        done();
      });
  });

  it('throws an error if a user creates a group with an existing name',
    (done) => {
      request(app)
        .post('/api/v1/group')
        .set('x-access-token', userTokenLionel)
        .send(group.existingNameMmaJunkies)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Group name already in use');
          done();
        });
    });

  it('throws an error if a user creates a group with an empty string name',
    (done) => {
      request(app)
        .post('/api/v1/group')
        .set('x-access-token', userTokenLionel)
        .send(group.emptyStringNameGroup)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter a group name');
          done();
        });
    });

  it('throws an error if a user creates a group with no description',
    (done) => {
      request(app)
        .post('/api/v1/group')
        .set('x-access-token', userTokenLionel)
        .send(group.noGroupDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a description'
          + ' about the group');
          done();
        });
    });

  it('throws an error if no userId is provided when adding a user to a group',
    (done) => {
      request(app)
        .post('/api/v1/group/1/user')
        .set('x-access-token', userTokenLionel)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.message).to.equal('Please enter a VALID userId');
          done();
        });
    });

  it('throws an error if the id of the user to be added to a group' +
'is not a number',
  (done) => {
    request(app)
      .post('/api/v1/group/1/user')
      .set('x-access-token', userTokenLionel)
      .send({ userId: '235t' })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Please enter a VALID userId');
        done();
      });
  });

  it('throws an error if a non-group member adds a user to a group', (done) => {
    request(app)
      .post('/api/v1/group/1/user')
      .set('x-access-token', userTokenNonMember)
      .send({ userId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('not a member of this group');
        done();
      });
  });

  it('throws an error if an existing group member is added' +
  'to the same group', (done) => {
    request(app)
      .post('/api/v1/group/1/user')
      .set('x-access-token', userTokenLionel)
      .send({ userId: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('user already exists');
        done();
      });
  });

  it('throws an error if an unregistered member is added to a group',
    (done) => {
      request(app)
        .post('/api/v1/group/1/user')
        .set('x-access-token', userTokenLionel)
        .send({ userId: 100 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('user does not exist');
          done();
        });
    });


  it('throws an error if a non-logged-in user tries to create a group',
    (done) => {
      request(app)
        .post('/api/v1/group')
        .send(group.validGroupMmaJunkies)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('No token provided.');
          done();
        });
    });

  it('allows a logged in user to post messages to a group which he belongs',
    (done) => {
      request(app)
        .post('/api/v1/group/1/message')
        .set('x-access-token', userTokenLionel)
        .send(message.testMessage)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message.content).to.equal(
            message.testMessage.content);
          done();
        });
    });

  it('throws an error when a user posts a message that is all empty spaces',
    (done) => {
      request(app)
        .post('/api/v1/group/1/message')
        .set('x-access-token', userTokenLionel)
        .send(message.emptyContentMessage)
        .end((err, res) => {
          expect(res.body.message).to.equal('Please enter a message');
          done();
        });
    });

  it('throws an error if a user posts an empty message to a group', (done) => {
    request(app)
      .post('/api/v1/group/1/message')
      .set('x-access-token', userTokenLionel)
      .send({ })
      .end((err, res) => {
        expect(res.body.message).to.equal('Please enter a message');
        done();
      });
  });

  it('throws an error if a non-group member posts a message to a group',
    (done) => {
      request(app)
        .post('/api/v1/group/1/message')
        .set('x-access-token', userTokenNonMember)
        .send(group.validMessage1)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('not a member of this group');
          done();
        });
    });

  it('allows a user view all the messages in groups he/she belongs to',
    (done) => {
      request(app)
        .get('/api/v1/group/1/messages')
        .set('x-access-token', userTokenLionel)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Array);
          done();
        });
    });

  it('allows a logged in user search all groups in the application', (done) => {
    request(app)
      .get('/api/v1/groups/search')
      .set('x-access-token', userTokenLionel)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceof(Object);
        done();
      });
  });

  it('throws an error if a non-integer limit value is entered when ' +
   'searching for groups', (done) => {
    request(app)
      .get('/api/v1/groups/search?name=m&limit=boy')
      .set('x-access-token', userTokenLionel)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Please enter a VALID limit value');
        done();
      });
  });

  it('throws an error if a non-integer offset value is entered when ' +
   'searching for groups', (done) => {
    request(app)
      .get('/api/v1/groups/search?name=m&offset=boy')
      .set('x-access-token', userTokenLionel)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Please enter a VALID offset value');
        done();
      });
  });

  it('allows a logged in user see all members of groups he/she belongs to',
    (done) => {
      request(app)
        .get('/api/v1/group/1/users')
        .set('x-access-token', userTokenLionel)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Array);
          done();
        });
    });

  it('prevents a non-group member from viewing group messages', (done) => {
    request(app)
      .get('/api/v1/group/1/messages')
      .set('x-access-token', userTokenNonMember)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('not a member of this group');
        done();
      });
  });

  it('prevents a non-group member from viewing group members', (done) => {
    request(app)
      .get('/api/v1/group/1/users')
      .set('x-access-token', userTokenNonMember)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('not a member of this group');
        done();
      });
  });

  it('throws an error for a group members search with an invalid groupId',
    (done) => {
      request(app)
        .get('/api/v1/group/100/users')
        .set('x-access-token', userTokenLionel)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('group does not exist');
          done();
        });
    });

  it('allows a logged in user list all groups he/she belongs to', (done) => {
    request(app)
      .get('/api/v1/groups')
      .set('x-access-token', userTokenLionel)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceof(Array);
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

  it('throws an error if a non-integer limit value is entered when ' +
   'searching for users', (done) => {
    request(app)
      .get('/api/v1/users/search?username=m&limit=boy')
      .set('x-access-token', userTokenLionel)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Please enter a VALID limit value');
        done();
      });
  });

  it('throws an error if a non-integer offset value is entered when ' +
   'searching for users', (done) => {
    request(app)
      .get('/api/v1/users/search?username=m&offset=boy')
      .set('x-access-token', userTokenLionel)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Please enter a VALID offset value');
        done();
      });
  });

  it('allows a logged in user search for users in the application', (done) => {
    request(app)
      .get('/api/v1/users?username=i')
      .set('x-access-token', userTokenLionel)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceof(Object);
        done();
      });
  });

  it('throws an error if a non integer offset is entered in the search',
    (done) => {
      request(app)
        .get('/api/v1/users?username=i&offset=girl')
        .set('x-access-token', userTokenLionel)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.message).to.equal(
            'Please enter a VALID offset value');
          done();
        });
    });

  it('throws an error if a non integer limit is entered in the search',
    (done) => {
      request(app)
        .get('/api/v1/users?username=i&limit=girl')
        .set('x-access-token', userTokenLionel)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.message).to.equal('Please enter a VALID limit value');
          done();
        });
    });
});
