import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import localStorage from '../__mocks__/localStorage';
import { signUp, signIn, googleAuth, resetPassword, verifyUser } from '../../actions/userActions';
import * as types from '../../actions/actionTypes';
import { user } from '../__mocks__/__mockData__';

window.localStorage = localStorage;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates AUTH_SUCCESS when a user signs up  successfully', () => {
    nock('http://localhost')
      .post('/api/v1/user/signup')
      .reply(201, { user });

    const expectedActions = [
      {
        type: types.user.AUTH_SUCCESS,
        user
      }
    ];
    const store = mockStore({ user });
    return store.dispatch(signUp()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates AUTH_SUCCESS when a user signs in successfully', () => {
    nock('http://localhost')
      .post('/api/v1/user/signin')
      .reply(200, { user });

    const expectedActions = [
      {
        type: types.user.AUTH_SUCCESS,
        user
      }
    ];
    const store = mockStore({ user });
    return store.dispatch(signIn()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // it('creates AUTH_SUCCESS when a user signs in/signs up  successfully using Google', () => {
  //   nock('http://localhost')
  //     .post('/api/v1/user/google_auth')
  //     .reply(200, { user });

  //   const expectedActions = [
  //     {
  //       type: types.user.AUTH_SUCCESS,
  //       user
  //     }
  //   ];
  //   const store = mockStore({ user });
  //   return store.dispatch(googleAuth()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });

  it('creates RESET_SUCCESS when a user successfully resets his password', () => {
    nock('http://localhost')
      .post('/api/v1/user/reset/13678843eyyd')
      .reply(200, { success: true });

    const expectedActions = [
      {
        type: types.user.RESET_SUCCESS,
        response: true
      }
    ];
    const store = mockStore({ user });
    return store.dispatch(resetPassword('13678843eyyd')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
