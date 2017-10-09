import errorReducer from '../../reducers/errorReducer';
import * as types from '../../actions/actionTypes';

describe('member reducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toEqual(
      {}
    );
  });

  it('should return an error when passed ERROR_OCCURRED', () => {
    expect(errorReducer({}, {
      type: types.ERROR_OCCURRED,
      error: {
        Error: 'Your password length should be between' +
        ' EIGHT and TWENTY characters'
      }
    })).toEqual(
      {
        error: {
          Error: 'Your password length should be between' +
          ' EIGHT and TWENTY characters'
        }
      }
    );
  });
});
