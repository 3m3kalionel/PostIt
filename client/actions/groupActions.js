import axios from 'axios';

import setToken from '../utils/setToken';
import { group, ERROR_OCCURRED } from './actionTypes';

/**
* creates a new group with the group details provided
* @param {object} groupDetails
* @returns {object} action: type, group, message
*/
export const createGroup = groupDetails => (
  dispatch => (
    axios.post('/api/v1/group', groupDetails)
      .then(({ data: { message, group: newGroup } }) => {
        dispatch({
          type: group.CREATE_SUCCESS,
          group: newGroup,
          message
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
* lists all the groups a user belongs to
* @returns {object} action: type, list
*/
export const listGroups = () => (dispatch) => {
  setToken();
  return axios.get('/api/v1/groups/search?name=&limit=&offset=')
    .then(({ data }) => {
      dispatch({
        type: group.LIST_SUCCESS,
        list: data.groups
      });
      return data;
    })
    .catch(({ response: { data } }) => {
      dispatch({
        type: ERROR_OCCURRED,
        error: data
      });
    });
};

