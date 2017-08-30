import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import GroupsDiv from './GroupsDiv';
import ChatArea from './ChatArea';
import { createMessage } from '../../actions/messageActions';
import { listGroups } from '../../actions/groupActions';

/**
 * React component that displays the dashboard
 * @class
 * @extends {Component}
*/
class TwoColumnDiv extends Component {
  /**
   * Creates an instance of TwoColumnDiv.
   * @param {any} props 
   * @memberof TwoColumnDiv
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal'
    };
    this.selectGroup = this.selectGroup.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.setPriority = this.setPriority.bind(this);
  }

  /**
   * @memberof TwoColumnDiv
   * @returns {void}
   */
  componentDidMount() {
    this.props.listGroups();
  }

  /**
   * 
   * @method setPriority
   * @memberof ChatArea
   * @param {Object} event
   * @returns {void}
   */
  setPriority(event) {
    const priority = event.target.id;
    this.setState({
      priority
    });
  }

  /**
   * 
   * @method sendMessage
   * @returns {void}
   * @memberof ChatArea
   * @param {String} content
   * @param {Function} callback
   */
  sendMessage(content, callback) {
    callback();
    const members = this.props.groupsData[this.state.selectedGroup].members;
    const { priority } = this.state;
    this.props.createMessage(this.state.selectedGroup, { content, members, priority });
  }

  /**
   * 
   * @method selectGroup
   * @returns {void} 
   * @memberof TwoColumnDiv
   * @param {Object} event
   */
  selectGroup(event) {
    event.preventDefault();
    this.setState({ selectedGroup: event.target.id });
  }

  /**
   * 
   * @returns {Object} a JSX Object
   * @memberof TwoColumnDiv
   */
  render() {
    return (
      <div className="row" id="two-section-page">
        <GroupsDiv selectGroup={this.selectGroup} groups={this.props.groups} />
        <ChatArea groupId={this.state.selectedGroup} sendMessage={this.sendMessage} setPriority={this.setPriority} defaultPriority={this.state.priority} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.user.groups,
    groupsData: state.groups

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (bindActionCreators)(createMessage, dispatch),
    // getGroups: () => dispatch(listGroups())
    listGroups: (bindActionCreators)(listGroups, dispatch)
  };
};

TwoColumnDiv.propTypes = {
  listGroups: Proptypes.func.isRequired,
  groupsData: Proptypes.object.isRequired,
  createMessage: Proptypes.func.isRequired

};

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnDiv);
