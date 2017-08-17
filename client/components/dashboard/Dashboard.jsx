import React, { Component } from 'react';

import DashboardNavbar from './DashboardNavbar';
import TwoSectionDiv from './TwoSectionDiv';

class Dashboard extends Component {
  componentDidMount() {
    $('.modal').modal();
  }
  render() {
    return (
      <div>
        <TwoSectionDiv />
      </div>
    );
  }
}

export default Dashboard;
