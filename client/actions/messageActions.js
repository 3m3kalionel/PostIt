import axios from 'axios';

import { message, ERROR_OCCURRED } from './actionTypes';

export const createMessage = (groupId, messageData) => (
  dispatch => (
    axios.post(`/api/group/${groupId}/message`, messageData)
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
  )
);

export const listMessages = groupid => (
  dispatch => (
    axios.get(`/api/group/${groupid}/messages`)
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

