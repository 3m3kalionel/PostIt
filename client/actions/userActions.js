import axios from 'axios';

import { user, ERROR_OCCURRED } from './actionTypes';
import { setToken } from '../utils/manageToken';

export const signUp = userData => (
  dispatch => (
    axios.post('/api/user/signup', userData)
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
      })
  )
);

export const signIn = userData => (
  dispatch => (
    axios.post('/api/user/signin', userData)
      .then(({ data: { user: loggedInUser, token } }) => {
        setToken(token);
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

