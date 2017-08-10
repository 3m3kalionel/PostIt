import {
  GET_USER_GROUPS,
  GET_USER_GROUPS_ERROR
} from '../actions/actions';

const userGroups = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_GROUPS:
      return Object.assign({}, state, { success: action.userData });

    case GET_USER_GROUPS_ERROR:
      return Object.assign({}, state, { error: action.errorData });

    default: return state;
  }
};

export default userGroups;
