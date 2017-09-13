import { member } from '../actions/actionTypes';

const memberReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case member.SEARCH_SUCCESS:
      return {
        ...state,
        result: action.list
      };
    case 'CLEAR_SEARCH_LIST':
      return {
        result: []
      };
    default:
      return state;
  }
};

export default memberReducer;
