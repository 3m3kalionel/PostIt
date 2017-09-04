import expect from 'expect';
import memberReducer from '../reducers/memberReducer';
import * as types from '../actions/actionTypes';

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
        {
          id: 17,
          username: 'terungwa',
          email: 'terungwa@gmail.com',
          phone: 98765232
        }
      ]
    })).toEqual(
      {
        result: [
          {
            id: 17,
            username: 'terungwa',
            email: 'terungwa@gmail.com',
            phone: 98765232
          }
        ]
      }
    );
  });
});
