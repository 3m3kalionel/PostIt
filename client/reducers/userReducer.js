import { user, group } from '../actions/actionTypes';

const userReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case user.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.user
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
