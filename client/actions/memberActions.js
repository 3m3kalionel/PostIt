import axios from 'axios';

import { member, ERROR_OCCURRED } from './actionTypes';

/**
* adds a user to a group
* @param {number} groupId
* @param {number} userId
* @returns {object} action: type, message, member
*/
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

/**
* lists all members of a group
* @param {number} groupId
* @returns {array.object} action: type, list, member
*/
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

/**
* searches for users in the application
* @param {number} username
* @param {number} offset
* @param {number} limit
* @returns {array.object} action: type, list
*/
export const searchUsers = (username, offset, limit) => (
  dispatch => (
    axios
      .get(`/api/v1/users?username=${username}&limit=${limit}&offset=${offset}`)
      .then(({ data }) => {
        dispatch({
          type: member.SEARCH_SUCCESS,
          list: data
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
* clears the search results
* @returns {undefined}
*/
export const clearMemberSearchList = () => ({
  type: member.CLEAR_SUCCESS
});

