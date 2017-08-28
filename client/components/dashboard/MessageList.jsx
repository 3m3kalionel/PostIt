import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Proptypes from 'prop-types';

import { listMessages } from '../../actions/messageActions';
import { listMembers } from '../../actions/memberActions';

/**
 * 
 * @class MessageList
 * @extends {Component}
 */
class MessageList extends Component {
  /**
   * 
   * @param {any} nextProps 
   * @memberof MessageList
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.groupId !== nextProps.groupId){
      this.props.getMessages(nextProps.groupId);
      this.props.getMembers(nextProps.groupId);
    }
  }

  /**
   * 
   * @returns {Object} a JSX Object
   * @memberof MessageList
   */
  render() {
    const { messages } = this.props.group;
    let messageComponent;
    if (Array.isArray(messages) && messages.length > 0) {
      messageComponent = messages.map((message) => {
        return (
          <div className="card blue-grey darken-1" key={message.id}>
            <div className="card-content">
              <p>{message.content}</p>
            </div>
          </div>
        );
      });
    } else {
      // messageComponent = <div>
      //   <p>No message to display</p>
      // </div>
      return (
        <div id="no-messages">
          <p>There has been no activity in this group. Be the first to post a message.</p>
        </div>
      );
    }

    return (
      <div className="messages message-list-container">
        <ul id="message-list">
          <li>
            <div className="row">
              <div className="col l12">
                {messageComponent}
              </div>
            </div>
          </li>
        </ul>
      </div>
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

MessageList.propTypes = {
  groupId: Proptypes.string.isRequired,
  getMembers: Proptypes.func.isRequired,
  getMessages: Proptypes.func.isRequired,
  group: Proptypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
