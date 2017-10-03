import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import localStorage from '../__mocks__/localStorage';
import { createGroup, listGroups } from '../../actions/groupActions';
import * as types from '../../actions/actionTypes';
import { group, list } from '../__mocks__/__mockData__';

window.localStorage = localStorage;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates CREATE_SUCCESS when a group is created successfully', () => {
    nock('http://localhost')
      .post('/api/v1/group')
      .reply(201, { group });

    const expectedActions = [
      {
        type: types.group.CREATE_SUCCESS,
        group
      }
    ];

    const store = mockStore({ group });
    return store.dispatch(createGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ERROR_OCCURRED when a createGroup fails', () => {
    nock('http://localhost')
      .post('/api/v1/group')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];

    const store = mockStore({});
    return store.dispatch(createGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('cretes LIST_SUCCESS when list groups is called successfully', () => {
    nock('http://localhost')
      .get('/api/v1/groups')
      .reply(200, list);

    const expectedActions = [
      {
        type: types.group.LIST_SUCCESS,
        list
      }
    ];
    const store = mockStore({ list });
    return store.dispatch(listGroups()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('cretes ERROR_OCCURRED when listGroups fails', () => {
    nock('http://localhost')
      .get('/api/v1/groups')
      .reply(400, {});

    const expectedActions = [
      {
        type: types.ERROR_OCCURRED,
        error: {}
      }
    ];
    const store = mockStore({});
    return store.dispatch(listGroups()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

