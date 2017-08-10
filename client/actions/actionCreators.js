import axios from 'axios';
import * as actionTypes from './actions';


// const updateUser = user => ({
//   type: actionTypes.UPDATE_USER,
//   user
// });

export const signupAction = userData => ({
  type: actionTypes.SIGN_UP,
  userData
});

export const signupError = errorData => ({
  type: actionTypes.SIGN_UP_ERROR,
  errorData
});

export const signinAction = userData => ({
  type: actionTypes.SIGN_IN,
  userData
});

export const signinError = errorData => ({
  type: actionTypes.SIGN_IN_ERROR,
  errorData
});

export const getUserGroupsAction = groupsData => ({
  type: actionTypes.GET_USER_GROUPS,
  groupsData
});

export const getUserGroupsError = errorData => ({
  type: actionTypes.GET_USER_GROUPS_ERROR,
  errorData
});

export const signup = data => dispatch =>
  axios.post('/api/user/signup', data).then((response) => {
    dispatch(signupAction(response));
  }).catch((error) => {
    dispatch(signupError(error.response.data));
  });

export const mSignUp = (data, dispatch) =>
  axios.post('/api/user/signup', data).then((response) => {
    dispatch(signupAction(response));
  }).catch((error) => {
    dispatch(signupError(error.response.data));
  });

// export const signin = data => dispatch =>
//   axios.post('/api/user/signin', data).then((response) => {
//     dispatch(signinAction(response));
//   }).catch((error) => {
//     dispatch(signinError(error.response.data));
//   });

export const signin = (data, dispatch) =>
  axios.post('/api/user/signin', data).then((response) => {
    dispatch(signinAction(response));
    console.log('response - ', response);
  }).catch((error) => {
    dispatch(signinError(error.response.data));
  });

export const getUserGroups = (data, dispatch) =>
  axios.get('/api/groups', data).then((response) => {
    dispatch(getUserGroupsAction(response));
  }).catch((error) => {
    dispatch(getUserGroupsError(error.response.data));
  });

// export const signIn = (payload) => {
//   console.log('cfcf', payload);
//   return dispatch => axios.post('/api/user/signin', {
//     username: payload.username,
//     password: payload.password
//   })
//     .then((response) => {
//       console.log("veryty", response);
//       dispatch(updateUser(response.data.user));
//     })
//     .catch((err) => {
//       dispatch(updateUser({}));
//     });
// };

// export const signUpSuccess = payload => ({
//   type: actionTypes.SIGN_UP,
//   user: payload
// });

