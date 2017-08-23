import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GroupsDiv from './GroupsDiv.jsx';
import ChatArea from './ChatArea.jsx';
import { createMessage } from '../../actions/messageActions.js';
import { listGroups } from '../../actions/groupActions.js';

class TwoColumnDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      // message: ''
    }
    this.selectGroup = this.selectGroup.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.clearMessage = this.clearMessage.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ message: event.target.value });
  // }

  // clearMessage() {
  //   this.setState({ message: '' });
  // }

  componentDidMount() {
    this.props.listGroups();
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
    return (
      <div className="row" id="two-section-page">
        <GroupsDiv selectGroup={this.selectGroup} groups={this.props.groups} />
        <ChatArea groupId={this.state.selectedGroup} sendMessage={this.sendMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.user.groups
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createMessage: (bindActionCreators)(createMessage, dispatch),
    // getGroups: () => dispatch(listGroups())
    listGroups: (bindActionCreators)(listGroups, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnDiv);
