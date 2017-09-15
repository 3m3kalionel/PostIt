import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Proptypes from 'prop-types';
import moment from 'moment';

import { listMessages } from '../../actions/messageActions';
import { listMembers } from '../../actions/memberActions';

/**
  * React component that displays the messages
 * @class MessageList
 * @extends {Component}
 */
class MessageList extends Component {
  /**
   * @param{object} nextProps
   * @memberof MessageList
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.groupId !== nextProps.groupId) {
      this.props.getMessages(nextProps.groupId);
      this.props.getMembers(nextProps.groupId);
    }
  }

  getUserName(userId) {
    if (userId) {
      const { members } = this.props.group;
      const user = members && members.filter((member) => {
        return member.id === userId;
      })[0];
      return user.username;
    }
  }

  formatTime (date) {
    if (date) {
      const testTime = moment(date).fromNow().split(' ');
      let time = moment(date).fromNow();
      if (testTime.includes('hours') && testTime[0] < 23) {
        time = moment(date).calendar();
      } else if (testTime[0] > 23) {
        time = moment(date).fromNow();
      }
      return time;
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
              <p>{message.content}</p>
              <p className="priority">{message.priority}</p>
              <p className="sender">{this.getUserName(message.userId)}</p>
              <p className="time-sent">{this.formatTime(message.createdAt)}</p>
            </div>
          </div>
        </li>
      ));
    } else {
      return (
        <div id="no-messages">
          <p>No group messages to display.
             Select a group or click the<q>plus</q> button to start.</p>
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

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.groups[ownProps.groupId || 0]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (bindActionCreators)(listMessages, dispatch),
    getMembers: (bindActionCreators)(listMembers, dispatch)
  };
};

MessageList.defaultProps = {
  groupId: '',
  group: {}
};

MessageList.propTypes = {
  groupId: Proptypes.string,
  getMembers: Proptypes.func.isRequired,
  getMessages: Proptypes.func.isRequired,
  group: Proptypes.oneOfType([
    Proptypes.object,
    Proptypes.array,
    Proptypes.string
  ])
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
