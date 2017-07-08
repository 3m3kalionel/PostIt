import chai from 'chai';
import request from 'supertest';
import mocha from 'mocha';
import app from '../app';
import models from '../server/models';

const expect = chai.expect;

// user signup
// correct and incorrect passwords
// unique usernames, not null username entries
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
  it('creates a user on signup', () => {

  });
});
