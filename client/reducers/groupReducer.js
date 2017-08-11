import * as actionTypes from '../actions/actions';

const userGroups = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_GROUPS:
      return Object.assign({}, state, { success: action.groupsData });

    case actionTypes.GET_USER_GROUPS_ERROR:
      return Object.assign({}, state, { error: action.errorData });

    default:
      return state;
  }
};

export default userGroups;
