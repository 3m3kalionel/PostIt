import groupReducer from '../../reducers/groupReducer';
import * as types from '../../actions/actionTypes';
import * as mock from '../__mocks__/__mockData__';

describe('group reducer', () => {
  it('should return the initial state', () => {
    expect(groupReducer(undefined, {})).toEqual(
      {}
    );
  });

  it('should create a group when passed CREATE_SUCCESS', () => {
    expect(groupReducer({}, {
      type: types.group.CREATE_SUCCESS,
      group: mock.group,
      message: 'Group created'
    })).toEqual(
      {
        23: {
          members: [],
          message: 'Group created',
          messages: []
        }
      }
    );
  });

  it('should add a member to a group when passed ADD_SUCCESS', () => {
    const { email, id, phone, username } = mock.user;
    const groupNumber = mock.group.id;
    expect(groupReducer({
      [mock.group.id]: {
        members: [],
        messages: []
      }
    }, {
      groupId: groupNumber,
      type: types.member.ADD_SUCCESS,
      member: mock.user,
      message: 'User successfully added'
    })).toEqual(
      {
        [groupNumber]: {
          members: [
            {
              email, id, phone, username
            }
          ],
          messages: [],
          message: 'User successfully added'
        }
      }
    );
  });

  it('should list groups a member belongs to when passed LIST_SUCCESS', () => {
    const groupNumber = mock.groups.groupWithMembers.id;
    const initialState = {
      [groupNumber]: mock.groups.groupWithMembers
    };
    expect(groupReducer(initialState, {
      groupId: '1',
      type: types.member.LIST_SUCCESS,
      list: [
        {
          user: mock.user
        }
      ]
    })).toEqual(
      {
        [groupNumber]: mock.groups.groupWithMembers
      }
    );
  });

  it('should create a message when passed CREATE_SUCCESS', () => {
    const { id, content, userId, groupId, priority } = mock.message;
    const groupNumber = mock.groups.emptyGroup.id;
    expect(groupReducer({
      [groupNumber]: mock.groups.emptyGroup
    }, {
      type: types.message.CREATE_SUCCESS,
      message: mock.message
    })).toEqual(
      {
        [groupNumber]: {
          id: mock.groups.emptyGroup.id,
          members: [],
          messages: [
            {
              id,
              content,
              userId,
              groupId,
              priority
            }
          ]
        }
      }
    );
  });

  it('should list a member\'s messages when passed LIST_SUCCESS', () => {
    expect(groupReducer({
      [mock.groups.groupWithMessage.id]: mock.groups.groupWithMessage
    }, {
      type: types.message.LIST_SUCCESS,
      groupId: '2',
      list: [
        mock.message
      ]
    })).toEqual(
      {
        [mock.groups.groupWithMessage.id]: mock.groups.groupWithMessage
      }
    );
  });
});
