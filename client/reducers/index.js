import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import groupReducer from './groupReducer';

const rootReducer = combineReducers({
  // list reducers here
  user: userReducer,
  errors: errorReducer,
  groups: groupReducer
});

export default rootReducer;
