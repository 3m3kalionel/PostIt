import groupReducer from '../../reducers/groupReducer';
import * as types from '../../actions/actionTypes';

describe('group reducer', () => {
  it('should return the initial state', () => {
    expect(groupReducer(undefined, {})).toEqual(
      {}
    );
  });

  it('should create a group when passed CREATE_SUCCESS', () => {
    expect(groupReducer({}, {
      type: types.group.CREATE_SUCCESS,
      group: {
        id: 1,
        name: 'The dreamers, the believers',
        description: 'Believers in the law of atttraction'
      },
      message: 'Group created'
    })).toEqual(
      {
        1: {
          members: [],
          message: 'Group created',
          messages: []
        }
      }
    );
  });

  it('should add a member to a group when passed ADD_SUCCESS', () => {
    expect(groupReducer({
      1: {
        members: [],
        messages: []
      }
    }, {
      groupId: '1',
      type: types.member.ADD_SUCCESS,
      member: {
        user: {
          id: 2,
          username: 'user2',
          email: 'user2@gmail.com',
          phone: '00000000002',
        }
      }
    })).toEqual(
      {
        1: {
          members: [
            {
              user: {
                id: 2,
                username: 'user2',
                email: 'user2@gmail.com',
                phone: '00000000002',
              }
            }
          ],
          messages: []
        }
      }
    );
  });

  it('should list groups a member belongs to when passed LIST_SUCCESS', () => {
    expect(groupReducer({
      1: {
        members: [
          {
            user: {
              id: 2,
              username: 'user2',
              email: 'user2@gmail.com',
              phone: '00000000002',
            }
          }
        ],
        messages: []
      }
    }, {
      groupId: '1',
      type: types.member.LIST_SUCCESS,
      list: [
        {
          user: {
            id: 2,
            username: 'user2',
            email: 'user2@gmail.com',
            phone: '00000000002',
          }
        }
      ]
    })).toEqual(
      {
        1: {
          members: [
            {
              user: {
                id: 2,
                username: 'user2',
                email: 'user2@gmail.com',
                phone: '00000000002',
              }
            }
          ],
          messages: []
        }
      }
    );
  });

  it('should create a message when passed CREATE_SUCCESS', () => {
    expect(groupReducer({
      1: {
        members: [],
        messages: []
      }
    }, {
      type: types.message.CREATE_SUCCESS,
      message: {
        id: 20,
        content: "hey everyone. how's it going",
        userId: 20,
        groupId: 1
      }
    })).toEqual(
      {
        1: {
          members: [],
          messages: [
            {
              id: 20,
              content: "hey everyone. how's it going",
              userId: 20,
              groupId: 1
            }
          ]
        }
      }
    );
  });

  it('should list a member\'s messages when passed LIST_SUCCESS', () => {
    expect(groupReducer({
      1: {
        members: [],
        messages: []
      }
    }, {
      type: types.message.LIST_SUCCESS,
      groupId: '1',
      list: [
        {
          id: 14,
          content: "hey everyone. how's it going",
          userId: 11,
          groupId: 3,
        }
      ]
    })).toEqual(
      {
        1: {
          members: [],
          messages: [
            {
              id: 14,
              content: "hey everyone. how's it going",
              userId: 11,
              groupId: 3,
            }
          ]
        }
      }
    );
  });
});
