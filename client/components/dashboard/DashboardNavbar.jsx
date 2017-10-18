import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router';

/**
 * React component that displays the dashboard navbar
 * @class DashboardNavbar
 * @extends {Component}
*/
class DashboardNavbar extends Component {
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
            <li id="logout-button">
              <Link to="logout">
                <i
                  className="material-icons large"
                  data-delay="50"
                  data-tip="Logout"
                >exit_to_app
                </i>
              </Link>
              <ReactTooltip id="logout-tooltip" place="top" type="error" />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default DashboardNavbar;
