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
 * @class Dashboard
 * @extends {Component}
*/
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {object} props 
   * @memberof Dashboard
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
   * makes jquery function available on component mount
   * @method componentDidMount
   * @memberof Dashboard
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.listGroups();
    $('.modal').modal();
  }

  /**
   * sets the priority on click of a radio button
   * @method setPriority
   * @memberof Dashboard
   * @param {object} event
   * @returns {undefined}
   */
  setPriority(event) {
    const priority = event.target.id;
    this.setState({
      priority
    });
  }

  /**
   * sends the message provided in the input area
   * @method sendMessage
   * @returns {undefined}
   * @memberof Dashboard
   * @param {string} content
   * @param {Function} callback
   */
  sendMessage(content, callback) {
    callback();
    const members = this.props.groupsData[this.state.selectedGroup].members;
    const sender = this.props.user;
    const { priority } = this.state;
    this.props.createMessage(this.state.selectedGroup, { content, members, priority });
  }

  /**
   * changes the state of selected group
   * @method selectGroup
   * @returns {undefined}
   * @memberof Dashboard
   * @param {Object} event
   */
  selectGroup(event) {
    event.preventDefault();
    this.setState({ selectedGroup: event.target.id });
  }

  /**
   * 
   * @returns {object} component
   * @memberof Dashboard
   */
  render() {
    return (
      <div id="two-section-page">
        <GroupsDiv
          selectGroup={this.selectGroup}
          groups={this.props.groups}
          activeId={this.state.selectedGroup}
        />
        <ChatArea
          groupId={this.state.selectedGroup}
          sendMessage={this.sendMessage}
          setPriority={this.setPriority}
          defaultPriority={this.state.priority}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    groups: state.user.groups,
    groupsData: state.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (bindActionCreators)(createMessage, dispatch),
    listGroups: (bindActionCreators)(listGroups, dispatch)
  };
};

Dashboard.propTypes = {
  user: Proptypes.object.isRequired,
  listGroups: Proptypes.func.isRequired,
  groupsData: Proptypes.object.isRequired,
  createMessage: Proptypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
