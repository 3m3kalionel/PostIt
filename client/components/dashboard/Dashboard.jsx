import React, { Component } from 'react';
import DashboardNavbar from './Navbar.jsx';
import TwoColumnDiv from './TwoColumnDiv.jsx';

class Dashboard extends Component {
  renderNavbar() {
    return (
      <DashboardNavbar />
    );
  }

  renderTwoColumnDiv() {
    return (
      <TwoColumnDiv />
    );
  }


  render() {
    return (
      <div>
        {this.renderNavbar()}
        {this.renderTwoColumnDiv()}
      </div>
    );
  }

}

export default Dashboard;