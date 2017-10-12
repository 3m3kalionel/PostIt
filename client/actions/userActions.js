import axios from 'axios';

import { user, ERROR_OCCURRED } from './actionTypes';
import setToken from '../utils/setToken';

/**
* signs a new user up
* @param {object} userDetails
* @returns {object} action: type, user
*/
export const signUp = userDetails => (
  dispatch => (
    axios.post('/api/v1/user/signup', userDetails)
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

/**
* signs in a new user
* @param {object} userDetails
* @returns {object} action: type, user
*/
export const signIn = userDetails => (
  dispatch => (
    axios.post('/api/v1/user/signin', userDetails)
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

/**
* signs in a new user using his google details
* @param {object} userDetails
* @returns {object} action: type, user, message
*/
export const googleAuth = userDetails => (
  dispatch => (
    axios.post('/api/v1/user/google_auth', userDetails)
      .then(({ data: { user: newUser, token } }) => {
        setToken(token);
        dispatch({
          type: user.AUTH_SUCCESS,
          user: newUser,
          message: 'Login successful'
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

/**
* resets a user's password
* @param {string} token
* @param {object} resetDetails
* @returns {object} action: type
*/
export const resetPassword = (token, resetDetails) =>
  dispatch => axios.post(`/api/v1/user/reset/${token}`, resetDetails)
    .then(() => {
      dispatch({
        type: user.RESET_SUCCESS,
      });
    })
    .catch(({ response: { data } }) => {
      dispatch({
        type: ERROR_OCCURRED,
        error: data
      });
      return data;
    });

/**
* verifies a user's details before sending password reset link
* @param {string} userEmail
* @returns {object} action: type
*/
export const verifyUser = userEmail => (
  dispatch => (
    axios.post('/api/v1/user/verify', userEmail)
      .then(() => {
        dispatch({
          type: user.VERIFY_SUCCESS,
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

