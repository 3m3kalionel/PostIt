import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import localStorage from '../__mocks__/localStorage';
import { createMessage, listMessages } from '../../actions/messageActions';
import * as types from '../../actions/actionTypes';
import { message, list } from '../__mocks__/__mockData__';

window.localStorage = localStorage;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates CREATE_MESSAGE_SUCCESS when a message is posted successfully', () => {
    nock('http://localhost')
      .post('/api/v1/group/1/message')
      .reply(201, { message });

    const expectedActions = [
      {
        type: types.message.CREATE_SUCCESS,
        message
      }
    ];

    const store = mockStore({ message });
    return store.dispatch(createMessage(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LIST_SUCCESS when list messages is called successfully', () => {
    nock('http://localhost')
      .get('/api/v1/group/2/messages')
      .reply(200, list);

    const expectedActions = [
      {
        type: types.message.LIST_SUCCESS,
        list,
        groupId: 2
      }
    ];

    const store = mockStore({ message });
    return store.dispatch(listMessages(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

