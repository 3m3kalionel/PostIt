import { ERROR_OCCURRED } from '../actions/actionTypes';

/**
 * updates errors in the store
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
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
