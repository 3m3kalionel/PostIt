// import React, { Component } from 'react';
// import Navbar from './common/Navbar.jsx';
// import Dashboard from './dashboard/index.jsx';
// import { Router, Route } from 'react-router';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

// const routes = [
//   {
//     path: '/',
//     component: () => <div>Welcome to Postit</div>,
//     exact: true
//   },
//   {
//     path: '/dashboard',
//     component: () => <Dashboard />
//   }
// ];

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//     render() {
//       return(
//           <Router history={history}>
//             <div>
//               <Navbar />
//               {routes.map((route, index) => (
//                 <Route
//                   key={index}
//                   path={route.path}
//                   component={route.component}
//                   exact={route.exact}
//                 />
//               ))}
//             </div>
//           </Router>
//       );
//     }
// }

// export default App;


import React, { Component } from 'react';
import Navbar from './common/Navbar.jsx';

class App extends Component {

  render() {
    return(
          <div>
            <Navbar />
          </div>
    );
  }
}

export default App;
