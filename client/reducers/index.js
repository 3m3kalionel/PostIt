import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import auth from './auth';
// import manageDocuments from './document';
// import manageRoles from './role';
// import manageSearch from './search';

const rootReducer = combineReducers({
  // Add all reducers here
  userReducer
  // auth,
  // manageUsers,
  // manageDocuments,
  // manageSearch,
  // manageRoles
});

export default rootReducer;
