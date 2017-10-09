import axios from 'axios';
import setToken from '../utils/setToken';

import { group, ERROR_OCCURRED } from './actionTypes';

/**
* makes a call to the api endpoint, creating a new group with the data provided
* @param {object} groupData
* @returns {object} group
* @returns {string} message
*/
export const createGroup = groupData => (
  dispatch => (
    axios.post('/api/v1/group', groupData)
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
* The listGroups action makes a call to the api endpoint
* and lists all the groups a user belongs to
* @returns {array.object} list
*/
export const listGroups = () => (dispatch) => {
  setToken();
  return axios.get('/api/v1/groups')
    .then(({ data }) => {
      dispatch({
        type: group.LIST_SUCCESS,
        list: data
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

