import axios from 'axios';

import { user, ERROR_OCCURRED } from './actionTypes';
import { setToken } from '../utils/manageToken';

export const signUp = userData => (
  dispatch => (
    axios.post('/api/v1/user/signup', userData)
      .then(({ data: { user: newUser, token } }) => {
        setToken(token);
        dispatch({
          type: user.AUTH_SUCCESS,
          user: newUser
        });
      })
      .catch(({ response: { data } }) => {
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
        return data;
      })
  )
);

export const signIn = userData => (
  dispatch => (
    axios.post('/api/v1/user/signin', userData)
      .then(({ data: { user: loggedInUser, token } }) => {
        setToken(token);
        localStorage.setItem('postit-token', token);
        dispatch({
          type: user.AUTH_SUCCESS,
          user: loggedInUser
        });
      })
      .catch(({ response: { data } }) => {
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      })
  )
);

export const googleAuth = userData => (
  dispatch => (
    axios.post('/api/v1/user/google_auth', userData)
      .then(({ data: { user: newUser, token } }) => {
        setToken(token);
        dispatch({
          type: user.AUTH_SUCCESS,
          user: newUser,
          message: 'Successful'
        });
      })
      .catch(({ response: { data } }) => {
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      })
  )
);

export const resetPassword = (token, resetDetails) => {
  return dispatch => {
    return axios.post(`/api/v1/user/reset/${token}`, resetDetails)
      .then(({ data }) => {
        dispatch({
          type: user.RESET_SUCCESS,
          response: data.success
        });
      })
      .catch(({ response: { data } }) => {
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      });
  };
};

export const verifyUser = userEmail => (
  dispatch => (
    axios.post('/api/v1/user/verify', userEmail)
      .then(({ data }) => {
        dispatch({
          type: user.VERIFY_SUCCESS,
          response: data.success
        });
      })
      .catch(({ response: { data } }) => {
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      })
  )
);

export const listMembers = groupId => (
  dispatch => (
    axios.get(`/api/v1/group/${groupId}/users`)
      .then(({ data }) => {
        dispatch({
          type: member.LIST_SUCCESS,
          list: data,
          groupId
        });
      })
      .catch(({ response: { data } }) => {
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      })
  )
);

