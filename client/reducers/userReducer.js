import initialState from './initialState';
import * as actionTypes from '../actions/actions';

// const userReducer = (state = initialState.user, action) => {
//   console.log("action", action);
//   switch (action.type) {
//     case UPDATE_USER: {
//       return Object.assign({}, state, action.user);
//     }
//     default: {
//       console.log('Default fired');
//       return state;
//     }
//   }
// };

const userReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      return Object.assign({}, state, { success: action.userData });

    case actionTypes.SIGN_UP_ERROR:
      return Object.assign({}, state, { error: action.errorData });

    case actionTypes.SIGN_IN:
      return Object.assign({}, state, { success: action.userData });

    case actionTypes.SIGN_IN_ERROR:
      return Object.assign({}, state, { success: action.errorData });

    default: return state;
  }
};

export default userReducer;
