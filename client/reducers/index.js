import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import groupReducer from './groupReducer';
import memberReducer from './memberReducer';

const rootReducer = combineReducers({
  // list reducers here
  user: userReducer,
  errors: errorReducer,
  groups: groupReducer,
  results: memberReducer
});

export default rootReducer;
