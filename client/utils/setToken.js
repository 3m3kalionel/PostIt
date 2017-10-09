import axios from 'axios';

const saveToken = (token) => {
  localStorage.setItem('postit-token', token);
};

const retrieveToken = () => localStorage.getItem('postit-token');

const setToken = (token) => {
  if (token) {
    saveToken(token);
  } else {
    token = retrieveToken();
  }
  axios.defaults.headers.common['x-access-token'] = token;
};

export default setToken;
