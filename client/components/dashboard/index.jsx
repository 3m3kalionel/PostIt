import React, { Component } from 'react';
import DefaultPage from './DefaultPage.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <DefaultPage />
      </div>
    );
  }
};

export default Dashboard;
