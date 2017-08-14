import axios from 'axios';

import { group, ERROR_OCCURRED } from './actionTypes';

export const createGroup = groupData => (
  dispatch => (
    axios.post('/api/group', groupData)
      .then(({ data: { group: newGroup } }) => {
        dispatch({
          type: group.CREATE_SUCCESS,
          group: newGroup
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

export const listGroups = () => (
  dispatch => (
    axios.get('/api/groups')
      .then(({ data }) => {
        dispatch({
          type: group.LIST_SUCCESS,
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

