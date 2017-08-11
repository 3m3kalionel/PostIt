// import React from 'react';
// import ReactDOM from 'react-dom';
// // import { Provider } from 'react-redux';

// import App from './components/App2';
// import Dashboard from './components/dashboard/index.jsx';
// import NewDashboard from './components/dashboard/Dashboard.jsx';

// import configureStore from './store/configureStore';
// import '../template/css/message-board.css';
// import '../template/css/landing-page.css';
// import initialState from './reducers/initialState';
// const store = configureStore(initialState);

// ReactDOM.render(
//   <Provider store={store}>
//     <App />,
//   </Provider>,
//   document.getElementById('app')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch  }  from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './components/App.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import store from './store/configureStore.dev';
import Signup from './components/auth/Signup.jsx';
import Signin from './components/auth/Signin.jsx';

import '../template/css/message-board.css';
import '../template/css/landing-page.css';



ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={App}/>        
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('app')
);