import axios from 'axios';

import { setToken } from '../utils/manageToken';
import { member, ERROR_OCCURRED } from './actionTypes';

export const addMember = (groupId, userId) => (
  dispatch => (
    axios.post(`/api/group/${groupId}/user`, { userId })
      .then(({ data: { user } }) => {
        dispatch({
          type: member.ADD_SUCCESS,
          member: user,
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

export const listMembers = groupId => (
  dispatch => (
    axios.get(`/api/group/${groupId}/users`)
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

export const searchUsers = (username) => {
  return (dispatch) => {
    setToken();
    axios.post('/api/users', username)
      .then(({ data }) => {
        dispatch({
          type: member.SEARCH_SUCCESS,
          list: data
        });
      })
      .catch((error) => {
        const data = error.response ? error.response.data : error;
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      });
  };
};
