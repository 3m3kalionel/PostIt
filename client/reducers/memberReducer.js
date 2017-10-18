import { member } from '../actions/actionTypes';

/**
 * updates members in the store depending on the action type
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const memberReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case member.SEARCH_SUCCESS:
      return {
        ...state,
        result: action.list
      };
    case member.CLEAR_SUCCESS:
      return {
        result: {}
      };
    default:
      return state;
  }
};

export default memberReducer;
