import { ERROR_OCCURRED } from '../actions/actionTypes';

const errorReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ERROR_OCCURRED:
      return {
        ...state,
        error: action.error
      };
    default:
      return {};
  }
};

export default errorReducer;
