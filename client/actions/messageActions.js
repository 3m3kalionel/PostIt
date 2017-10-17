import axios from 'axios';

import { message, ERROR_OCCURRED } from './actionTypes';

/**
* creates a message
* @param {number} groupId
* @param {object} messageDetails
* @returns {object} action: type, message
*/
export const createMessage = (groupId, messageDetails) => dispatch => (
  axios.post(`/api/v1/group/${groupId}/message`, messageDetails)
    .then(({ data: { message: newMessage } }) => {
      dispatch({
        type: message.CREATE_SUCCESS,
        message: newMessage
      });
    })
    .catch(({ response: { data } }) => {
      dispatch({
        type: ERROR_OCCURRED,
        error: data
      });
    })
);

/**
* lists all the messages in a group a user belongs to
* @param {number} groupid
* @returns {object} action: type, list
*/
export const listMessages = groupid => (
  dispatch => (
    axios.get(`/api/v1/group/${groupid}/messages`)
      .then(({ data }) => {
        dispatch({
          type: message.LIST_SUCCESS,
          list: data,
          groupId: groupid
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

