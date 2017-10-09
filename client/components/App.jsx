import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Navbar from './auth/common/Navbar';
import DashboardNavbar from './dashboard/DashboardNavbar';

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * renders navbar depending on which page is in use
   * @method renderNavbar
   * @memberof App
   * @returns {object} the navbar to be rendered
   */
  renderNavbar() {
    const location = window.location.pathname;
    if (location === '/dashboard') {
      return <DashboardNavbar />;
    }
    return <Navbar />;
  }

  /**
   * @returns {object} component
   * @memberof App
  */
  render() {
    return (
      <div className="postit-app">
        {this.renderNavbar()}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
