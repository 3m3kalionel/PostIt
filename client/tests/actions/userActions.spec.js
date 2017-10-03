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

  it('creates ERROR_OCCURRED when user signup fails', () => {
    nock('http://localhost')
      .post('/api/v1/user/signup')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];
    const store = mockStore({});
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

  it('creates ERROR_OCCURRED when user signin fails', () => {
    nock('http://localhost')
      .post('/api/v1/user/signin')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];
    const store = mockStore({});
    return store.dispatch(signIn()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ERROR_OCCURRED when a user signs in/signs up  successfully using Google', () => {
    nock('http://localhost')
      .post('/api/v1/user/google_auth')
      .reply(200, { user });

    const expectedActions = [
      {
        type: types.user.AUTH_SUCCESS,
        user,
        message: 'Successful'
      }
    ];
    const store = mockStore({ user });
    return store.dispatch(googleAuth()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ERROR_OCCURRED google signin/signup fails', () => {
    nock('http://localhost')
      .post('/api/v1/user/google_auth')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];
    const store = mockStore({});
    return store.dispatch(googleAuth()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

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

  it('creates ERROR_OCCURRED when password reset fails', () => {
    nock('http://localhost')
      .post('/api/v1/user/reset/13678843eyyd')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];
    const store = mockStore({});
    return store.dispatch(resetPassword('13678843eyyd')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates VERIFY_SUCCESS when a user successfully inputs the correct email', () => {
    nock('http://localhost')
      .post('/api/v1/user/verify')
      .reply(200, { success: true });

    const expectedActions = [
      {
        type: types.user.VERIFY_SUCCESS,
        response: true
      }
    ];
    const store = mockStore({ user });
    return store.dispatch(verifyUser('abc@gmail.com')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ERROR_OCCURRED when email verification fails', () => {
    nock('http://localhost')
      .post('/api/v1/user/verify')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];
    const store = mockStore({});
    return store.dispatch(verifyUser('abc@gmail.com')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // it('creates LIST_SUCCESS when listMembers is called successfully', () => {
  //   nock('http://localhost')
  //     .post('/api/v1/group/3/users')
  //     .reply(200, list);

  //   const expectedActions = [
  //     {
  //       type: types.user.LIST_SUCCESS,
  //       list,
  //       groupId: 3
  //     }
  //   ];
  //   const store = mockStore({ });
  //   return store.dispatch(listMembers(3)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
});
