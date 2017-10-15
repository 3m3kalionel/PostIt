import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import formatTime from '../../utils/formatTime';

import { listMessages } from '../../actions/messageActions';
import { listMembers } from '../../actions/memberActions';

/**
  * React component that displays the messages
 * @class MessageList
 * @extends {Component}
 */
export class MessageList extends Component {
  /**
   * @param {object} nextProps
   * @memberof MessageList
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.groupId !== nextProps.groupId) {
      this.props.getMessages(nextProps.groupId);
      this.props.getMembers(nextProps.groupId);
    }
  }

  /**
   * @method getUsername
   * @param {number} userId
   *  @memberof MessageList
   * @return {string} the message sender's usename
   */
  getUsername(userId) {
    if (userId) {
      const { members } = this.props.group;
      const user = members && members.filter(member => member.id === userId)[0];
      return user && user.username;
    }
  }

  /**
   * @returns {Object} component
   * @memberof MessageList
   */
  render() {
    const { messages } = this.props.group;
    let messageComponent;
    if (Array.isArray(messages) && messages.length > 0) {
      messageComponent = messages.map(message => (
        <li key={message.id}>
          <div className="card">
            <div className="card-content">
              <p className="content">{message.content}</p>
              <p className="priority">{message.priority}</p>
              <p className="sender">{this.getUsername(message.userId)}</p>
              <p className="time-sent">{formatTime(message.createdAt)}</p>
            </div>
          </div>
        </li>
      ));
    } else {
      return (
        <div id="no-messages">
          <p>No group messages to display.
             Select a group or click the <q>plus</q> button to start.</p>
        </div>
      );
    }

    return (
      <ul id="message-list">
        {messageComponent}
      </ul>
    );
  }
}

MessageList.defaultProps = {
  group: {}
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  group: state.groups[ownProps.groupId || 0]
});

const mapDispatchToProps = dispatch => ({
  getMessages: (bindActionCreators)(listMessages, dispatch),
  getMembers: (bindActionCreators)(listMembers, dispatch)
});

MessageList.defaultProps = {
  groupId: '',
  group: {}
};

MessageList.propTypes = {
  groupId: PropTypes.string,
  getMembers: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  group: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ])
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
