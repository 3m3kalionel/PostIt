import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import localStorage from '../__mocks__/localStorage';
import { addMember, listMembers, searchUsers }
  from '../../actions/memberActions';
import * as types from '../../actions/actionTypes';
import { user, list } from '../__mocks__/__mockData__';

window.localStorage = localStorage;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates ADD_SUCCESS when a member is added successfully', () => {
    nock('http://localhost')
      .post('/api/v1/group/3/user')
      .reply(200, { message: 'r added to group', user });

    const expectedActions = [
      {
        type: types.member.ADD_SUCCESS,
        member: user,
        message: 'r added to group',
        groupId: 3
      }
    ];

    const store = mockStore({ });
    return store.dispatch(addMember(3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ERROR_OCCURRED when addMember fails', () => {
    nock('http://localhost')
      .post('/api/v1/group/3/user')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];

    const store = mockStore({});
    return store.dispatch(addMember(3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LIST_SUCCESS when list members is called successfully', () => {
    nock('http://localhost')
      .get('/api/v1/group/4/users')
      .reply(200, list);

    const expectedActions = [
      {
        type: types.member.LIST_SUCCESS,
        list,
        groupId: 4
      }
    ];

    const store = mockStore({ });
    return store.dispatch(listMembers(4)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ERROR_OCCURRED when listMembers fails', () => {
    nock('http://localhost')
      .get('/api/v1/group/4/users')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];

    const store = mockStore({ });
    return store.dispatch(listMembers(4)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SEARCH_SUCCESS when search users is called successfully', () => {
    nock('http://localhost')
      .get('/api/v1/users')
      .query({ username: 'e', limit: 3, offset: 0 })
      .reply(200, list);

    const expectedActions = [
      {
        type: types.member.SEARCH_SUCCESS,
        list
      }
    ];

    const store = mockStore({});
    return store.dispatch(searchUsers('e', 0, 3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ERROR_OCCURRED when searchUsers fails', () => {
    nock('http://localhost')
      .get('/api/v1/users')
      .query({ username: 'e', limit: 3, offset: 0 })
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];

    const store = mockStore({});
    return store.dispatch(searchUsers('e', 0, 3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
