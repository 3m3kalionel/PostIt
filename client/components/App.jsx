import React, { Component } from 'react';
import { render } from 'react-dom';

import Header from './common/Header.jsx';
import LandingPage from './auth/LandingPage';

import Dashboard from './dashboard/Dashboard.jsx';
import DashboardNavbar from './dashboard/DashboardNavbar';


class App extends Component {
  renderHeader() {
    const location = window.location.pathname;
    if (location === '/') {
      return <Header />;
    }
    return <DashboardNavbar />
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.props.children}
      </div>
    );
  }
}

export default App;