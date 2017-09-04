import expect from 'expect';
import userReducer from '../reducers/userReducer';
import * as types from '../actions/actionTypes';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      {}
    );
  });

  it('should sign a user in when passed AUTH_SUCCESS', () => {
    expect(userReducer({}, {
      type: types.user.AUTH_SUCCESS,
      user: {
        user: {
          id: 11,
          username: 'user1',
          email: 'user1@gmail.com',
          phone: '00000000001',
        },
        groups: []
      }
    })).toEqual(
      {
        isAuthenticated: true,
        user: {
          id: 11,
          username: 'user1',
          email: 'user1@gmail.com',
          phone: '00000000001',
        },
        groups: []
      }
    );
  });

  it('should create a group when passed CREATE_GROUP_SUCCESS', () => {
    expect(userReducer(
      {
        isAuthenticated: true,
        user: {
          id: 11,
          username: 'user1',
          email: 'user1@gmail.com',
          phone: '00000000001',
        },
        groups: []
      },
      {
        type: types.group.CREATE_SUCCESS,
        group: {
          success: true,
          message: 'Group created',
          group: {
            id: 4,
            name: 'The dreamers, the believers',
            description: 'Believers in the law of atttraction',
          }
        }
      })).toEqual(
      {
        isAuthenticated: true,
        user: {
          id: 11,
          username: 'user1',
          email: 'user1@gmail.com',
          phone: '00000000001',
        },
        groups: [
          {
            success: true,
            message: 'Group created',
            group: {
              id: 4,
              name: 'The dreamers, the believers',
              description: 'Believers in the law of atttraction',
            }
          }
        ]
      }
    );
  });

  it('should list a user\'s groups when passed LIST_GROUP_SUCCESS', () => {
    expect(userReducer(
      {
        isAuthenticated: true,
        user: {
          id: 11,
          username: 'user1',
          email: 'user1@gmail.com',
          phone: '00000000001',
        },
        groups: [
          {
            success: true,
            message: 'Group created',
            group: {
              id: 4,
              name: 'The dreamers, the believers',
              description: 'Believers in the law of atttraction',
            }
          }
        ]
      },
      {
        type: types.group.LIST_SUCCESS,
        list: [
          {
            success: true,
            message: 'Group created',
            group: {
              id: 4,
              name: 'The dreamers, the believers',
              description: 'Believers in the law of atttraction',
            }
          }
        ]
      })).toEqual(
      {
        isAuthenticated: true,
        user: {
          id: 11,
          username: 'user1',
          email: 'user1@gmail.com',
          phone: '00000000001',
        },
        groups: [
          {
            success: true,
            message: 'Group created',
            group: {
              id: 4,
              name: 'The dreamers, the believers',
              description: 'Believers in the law of atttraction',
            }
          }
        ]
      }
    );
  });
});
