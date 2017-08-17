import axios from 'axios';

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

