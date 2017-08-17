import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GroupsDiv from './GroupsDiv.jsx';
import ChatArea from './ChatArea.jsx';
import { createMessage } from '../../actions/messageActions.js';

class TwoColumnDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null
    }
    this.selectGroup = this.selectGroup.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  selectGroup(event) {
    event.preventDefault();
    this.setState({ selectedGroup: event.target.id });
  }

  sendMessage(content, callback) {
    callback();    
    this.props.createMessage(this.state.selectedGroup, { content });
  }

  render() {
    console.log('====', this.state.selectedGroup)
    return (
      <div className="row" id="two-section-page">
        {/*<DashboardNavbar />*/}
        <GroupsDiv selectGroup={this.selectGroup} />
        <ChatArea groupId={this.state.selectedGroup} sendMessage={this.sendMessage} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMessage: (bindActionCreators)(createMessage, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(TwoColumnDiv);
