import axios from 'axios';

const saveToken = (token) => {
  localStorage.setItem('postit-token', token);
};

export const retrieveToken = () => {
  return localStorage.getItem('postit-token');
}

const setToken = (token) => {
  if (token) {
    saveToken(token);
  } else {
    token = retrieveToken();
  }
  axios.defaults.headers.common['x-access-token'] = token;
};

export { setToken };
