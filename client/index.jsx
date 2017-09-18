import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './Routes';

import store from './store';
import './sass/common.scss';
import Dashboard from './components/dashboard/Dashboard';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('app')
);
