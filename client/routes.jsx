import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
// import retrieveToken from './utils/manageToken.js'
import LandingPage from './components/auth/LandingPage.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

const onEnter = (next, replace, cb) => {
  if (localStorage.getItem('postit-token') !== null && next.location.pathname === '/') {
    replace('/dashboard');
  }
  if (localStorage.getItem('postit-token') === null && (next.location.pathname === ('/dashboard'))) {
    replace('/');
  }
  cb();
};
const logout = (next, replace) => {
  localStorage.removeItem('postit-token');
  replace('/');
};

export default (
  <Route path='/' component={App}>
    <IndexRoute component={LandingPage} onEnter={onEnter}/>
    <Route path='dashboard' component={Dashboard} onEnter={onEnter}/>
    <Route path='logout' onEnter={logout}/>
  </Route>
);
