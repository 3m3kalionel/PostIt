import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import groupReducer from './groupReducer';
import memberReducer from './memberReducer';

const index = combineReducers({
  user: userReducer,
  errors: errorReducer,
  groups: groupReducer,
  members: memberReducer
});

export default index;
