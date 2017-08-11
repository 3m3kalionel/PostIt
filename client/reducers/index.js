import { combineReducers } from 'redux';
import userReducer from './userReducer';
import userGroups from './groupReducer';
// import auth from './auth';
// import manageDocuments from './document';
// import manageRoles from './role';
// import manageSearch from './search';

const rootReducer = combineReducers({
  // Add all reducers here
  user: userReducer,
  groups: userGroups
  // auth,
  // manageUsers,
  // manageDocuments,
  // manageSearch,
  // manageRoles
});

export default rootReducer;
