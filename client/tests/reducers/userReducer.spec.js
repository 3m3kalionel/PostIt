import userReducer from '../../reducers/userReducer';
import * as types from '../../actions/actionTypes';
import * as mock from '../__mocks__/__mockData__';


describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      {}
    );
  });

  it('should sign a user in when passed AUTH_SUCCESS', () => {
    const { email, id, phone, username } = mock.users.validUserEmeka;
    expect(userReducer({}, {
      type: types.user.AUTH_SUCCESS,
      message: 'Successfully Authenticated',
      user: mock.users.validUserEmeka
    })).toEqual(
      {
        isAuthenticated: true,
        email,
        id,
        phone,
        username,
        message: 'Successfully Authenticated'
      }
    );
  });

  it('should create a group when passed CREATE_GROUP_SUCCESS', () => {
    expect(userReducer(
      {
        user: mock.users.authenticatedUserLionel,
        groups: []
      },
      {
        type: types.group.CREATE_SUCCESS,
        group: mock.groups.sampleGroup,
        message: 'Group created successfully'
      })).toEqual(
      {
        user: mock.users.authenticatedUserLionel,
        groups: [
          mock.groups.sampleGroup
        ],
        message: 'Group created successfully'
      }
    );
  });

  it('should list a user\'s groups when passed LIST_GROUP_SUCCESS', () => {
    expect(userReducer(
      {
        user: mock.users.authenticatedUserLionel,
        groups: [
          mock.groups.sampleGroup
        ]
      },
      {
        type: types.group.LIST_SUCCESS,
        list: [
          mock.groups.sampleGroup
        ]
      })).toEqual(
      {
        user: mock.users.authenticatedUserLionel,
        groups: [
          mock.groups.sampleGroup
        ]
      }
    );
  });
});
