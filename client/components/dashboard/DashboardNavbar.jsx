import React, { Component } from 'react';
import { Link } from 'react-router'

class Navbar extends Component {
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <nav className="dashboard-navbar">
        <div className="navbar-wrapper">
          <a href="#!" className="brand-logo">PostIt!</a>
          <a href="#!" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right">
            <li><i className="large material-icons">notifications</i></li>
            <li><Link to="logout"><i className="material-icons large">exit_to_app</i></Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
