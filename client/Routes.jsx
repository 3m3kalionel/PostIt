import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import LandingPage from './components/auth/LandingPage';
import DashboardPage from './components/dashboard/Dashboard';
import ResetPasswordPage from './components/auth/ResetPassword';
import NotFoundPage from './components/NotFoundPage';

const onEnter = (next, replace, cb) => {
  if (localStorage.getItem('postit-token') !== null
    && next.location.pathname === '/') {
    replace('/dashboard');
  }
  if (localStorage.getItem('postit-token') === null
    && (next.location.pathname === ('/dashboard'))) {
    replace('/');
  }
  cb();
};
const logout = (next, replace) => {
  localStorage.removeItem('postit-token');
  replace('/');
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} onEnter={onEnter} />
    <Route path="dashboard" component={DashboardPage} onEnter={onEnter} />
    <Route path="logout" onEnter={logout} />
    <Route path="user/reset/:token" component={ResetPasswordPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
