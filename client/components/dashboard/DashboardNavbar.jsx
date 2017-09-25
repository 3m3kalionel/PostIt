import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * React component that displays the dashboard navbar
 * @class DashboardNavbar
 * @extends {Component}
*/
class Navbar extends Component {
  /**
   * makes jquery function available on component mount
   * @method componentDidMount
   * @memberof DashboardNavbar
   * @returns {undefined}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  /**
   * @memberof DashboardNavbar
   * @returns {object} component
   */
  render() {
    return (
      <nav className="dashboard-navbar">
        <div className="navbar-wrapper">
          <a href="#!" className="brand-logo">PostIt!</a>
          <a
            href="#!"
            data-activates="slide-out"
            className="button-collapse"
          ><i className="material-icons">menu</i></a>
          <ul className="right">
            <li><i className="large material-icons">notifications</i></li>
            <li><Link
              to="logout"
            >
              <i
                className="material-icons large tooltipped"
                data-delat="50"
                data-tooltip="Logout"
              >exit_to_app
              </i></Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
