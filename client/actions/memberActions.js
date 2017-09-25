import axios from 'axios';

import { member, ERROR_OCCURRED } from './actionTypes';

export const addMember = (groupId, userId) => (
  dispatch => (
    axios.post(`/api/v1/group/${groupId}/user`, { userId })
      .then(({ data: { user, message } }) => {
        dispatch({
          type: member.ADD_SUCCESS,
          member: user,
          message,
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

export const searchUsers = (username, offset, limit) => (
  dispatch => (
    axios.get(`/api/v1/users?username=${username}&limit=${limit}&offset=${offset}`)
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
      })
  )
);

export const clearMemberSearchList = () => ({
  type: 'CLEAR_SEARCH_LIST'
});

