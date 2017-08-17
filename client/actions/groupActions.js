import axios from 'axios';
import { setToken } from '../utils/manageToken';

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

export const listGroups = () => {
  return (dispatch) => {
    setToken();
    axios.get('/api/groups')
      .then(({ data }) => {
        dispatch({
          type: group.LIST_SUCCESS,
          list: data
        });
      })
      .catch((error) => {
        console.log(error);
        const data = error.response ? error.response.data : error;
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      });
  };
};
