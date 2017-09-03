import React, { Component } from 'react';
import { render } from 'react-dom';

import Header from './common/Header';
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
      <div className="postit-app">
        {this.renderHeader()}
        {this.props.children}
      </div>
    );
  }
}

export default App;