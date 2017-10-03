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
    $('#logout-button').tooltip({
      delay: 50,
      tooltip: 'Logout',
      position: 'bottom',
    });
    $('.logout').click((event) => {
      $('#logout-button').tooltip('remove');
    });
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
            <li id="logout-button">
              <Link className="logout" to="logout">
                <i
                  className="material-icons large tooltipped"
                  data-delay="50"
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
