// test the status
// test the groupId - compare the returned groupId against that in the url(req.body.params)
// test the message content

import chai from 'chai';
import request from 'supertest';
import mocha from 'mocha';
import app from '../app';
import models from '../server/models';
import group from './helpers/groups';

const expect = chai.expect;

// before((done) => {
//   models.sequelize.sync({ force: true }).then(() => {
//     done(null);
//   }).catch((errors) => {
//     done(errors);
//   });
// });

// describe('group route', () => {
//   it('allows a user create broadcast groups', (done) => {
//     request(app)
//       .post('/api/group')
//       .send(group.validGroup1)
//       .end((err, res) => {
//         expect(res.status).to.equal(201);
//         expect(res.body.name).to.equal(group.validGroup1.name);
//         done();
//       });
//   });

//   it('allows a user create broadcast groups', (done) => {
//     request(app)
//       .post('/api/group')
//       .send(group.validGroup2)
//       .end((err, res) => {
//         expect(res.status).to.equal(201);
//         expect(res.body.name).to.equal(group.validGroup2.name);
//         done();
//       });
//   });

//   it('allows a user add other users to a broadcast group', (done) => {
//     request(app)
//       .post('/api/group/1/user')
//       .send(group.profile1)
//       .end((err, res) => {
//         expect(res.text).to.equal('new user added to group');
//         done();
//       });
//   });

//   it('prevents adding a non-registered user', (done) => {
//     request(app)
//       .post('/api/group/1/user')
//       .send(group.errorProfile)
//       .end((err, res) => {
//         expect(res.text).to.equal('user not found');
//         done();
//       });
//   });

//   it('allows a logged in user to post messages to created groups', (done) => {
//     request(app)
//       .post('/api/group/1/message')
//       .send(group.validMessage1)
//       .end((err, res) => {
//         expect(res.status).to.equal(201);
//         expect(res.body.content).to.equal(group.validMessage1.content);
//         done();
//       });
//   });

//   it('allows a logged in user to post messages to created groups', (done) => {
//     request(app)
//       .post('/api/group/1/message')
//       .send(group.validMessage2)
//       .end((err, res) => {
//         expect(res.status).to.equal(201);
//         expect(res.body.content).to.equal(group.validMessage2.content);
//         done();
//       });
//   });

//   it('allows a logged in user to retrieve all posts in from groups he belongs to', (done) => {
//     request(app)
//       .get('/api/group/1/messages')
//       .end((err, res) => {
//         expect(res.body).to.be.an.instanceof(Array);
//         done();
//       });
//   });

//   it('rejects a group with an unregistered user', (done) => {
//     request(app)
//       .post('/api/group')
//       .send(group.invalidUserGroup)
//       .end((err, res) => {
//         expect(res.text).to.equal('user not found');
//         done();
//       });
//   });

//   it('rejects a group without a description', (done) => {
//     request(app)
//       .post('/api/group')
//       .send(group.noGroupDescription)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body.errors[0].message).to.equal('description cannot be null');
//         done();
//       });
//   });

//   it('rejects a group without a name', (done) => {
//     request(app)
//       .post('/api/group')
//       .send(group.noGroupName)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);        
//         expect(res.body.errors[0].message).to.equal('name cannot be null');
//         done();
//       });
//   });

//   it('rejects a group with no user email attribute', (done) => {
//     request(app)
//       .post('/api/group')
//       .send(group.anonymousCreatorGroup)
//       .end((err, res) => {
//         expect(res.text).to.equal('user not found');
//         done();
//       });
//   });





  // it('lists out all the posts in a group a user belongs to ', (done) => {
  //   request(app)
  //     .post('/api/group/:groupid/messages')
  //     .send(group.anonymousCreatorGroup)
  //     .end((err, res) => {
  //       expect(res.text).to.equal('user not found');
  //       done();
  //     });
  // });
// });

