import memberReducer from '../../reducers/memberReducer';
import * as types from '../../actions/actionTypes';
import * as mock from '../__mocks__/__mockData__';

describe('member reducer', () => {
  it('should return the initial state', () => {
    expect(memberReducer(undefined, {})).toEqual(
      {}
    );
  });

  it('should list out search results when passed SEARCH_SUCCESS', () => {
    expect(memberReducer({}, {
      type: types.member.SEARCH_SUCCESS,
      list: [
        mock.users.validUserEmeka
      ]
    })).toEqual(
      {
        result: [
          mock.users.validUserEmeka
        ]
      }
    );
  });
});
