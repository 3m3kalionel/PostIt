import axios from 'axios';

import { message, ERROR_OCCURRED } from './actionTypes';

export const createMessage = messageData => (
  dispatch => (
    axios.post('/api/group/:groupid/message', messageData)
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

export const listMessages = () => (
  dispatch => (
    axios.get('/api/group/:groupid/messages')
      .then(({ data }) => {
        dispatch({
          type: message.LIST_SUCCESS,
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

