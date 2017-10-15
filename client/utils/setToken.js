import axios from 'axios';

/**
 * saves the user's token to localStorage
 * @function setToken
 * @param {string} token
 * @returns {undefined}
 */
const saveToken = (token) => {
  localStorage.setItem('postit-token', token);
};

/**
 * retrieves a user's token from localStorage
 * @function retrieveToken
 * @returns {undefined}
 */
const retrieveToken = () => localStorage.getItem('postit-token');

/**
 * calls retrieveToken if token exists in the local storage
 * else, calls saveToken to save it to the local storage
 * @function setToken
 * @param {string} token
 * @returns {undefined}
 */
const setToken = (token) => {
  if (token) {
    saveToken(token);
  } else {
    token = retrieveToken();
  }
  axios.defaults.headers.common['x-access-token'] = token;
};

export default setToken;
