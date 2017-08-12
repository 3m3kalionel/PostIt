import axios from 'axios';

import { auth } from './actionTypes';

export function signUp(userData) {
  return dispatch => {
    axios.post('/api/user/signup', userData)
      .then((response) => {
        
      })
  }
}