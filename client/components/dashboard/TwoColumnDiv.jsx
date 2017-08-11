import React, { Component } from 'react';

import AddButton from './AddButton.jsx';
import AddGroup from './AddGroup.jsx';
import ChatArea from './ChatArea.jsx';
import ChatInput from './ChatInput.jsx';
import DashboardNavbar from './DashboardNavbar.jsx';
import GroupsDiv from './GroupsDiv.jsx';
import GroupList from './ShowGroups.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';
// import TwoColumnDiv from './TwoColumnDiv.jsx';

class TwoColumnDiv extends Component {
  render() {
    return (
      <div className="row" id="two-section-page">
        <GroupsDiv />
        <ChatArea />
      </div>
    );
  }
}

export default TwoColumnDiv;