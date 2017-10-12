import { user, group } from '../actions/actionTypes';

/**
 * updates user in the store
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const userReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case user.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.user,
        message: action.message
      };
    case group.CREATE_SUCCESS:
      return {
        ...state,
        groups: [
          ...state.groups,
          action.group
        ]
      };
    case group.LIST_SUCCESS:
      return {
        ...state,
        groups: action.list
      };
    default:
      return state;
  }
};

export default userReducer;
