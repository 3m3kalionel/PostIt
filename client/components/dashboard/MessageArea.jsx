import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddButton from './AddButton';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import AddUserModal from './AddUserModal';
import CreateGroupModal from './CreateGroupModal';

/**
 * React component that displays the chat section
 * @class MessageArea
 * @extends {Component}
*/
class MessageArea extends Component {
  /**
   *
   * @method renderMessageArea
   * @memberof MessageArea
   * @returns {object} a chat area component
  */
  renderMessageArea() {
    const { defaultPriority } = this.props;
    const PriorityButtons = () => (
      <div>
        <input
          className="with-gap"
          name="group3"
          type="radio"
          id="normal"
          checked={defaultPriority === 'normal'}
          onChange={this.props.setPriority}
        />
        <label htmlFor="normal">Normal</label>
        <input
          className="with-gap"
          name="group3"
          type="radio"
          id="urgent"
          checked={defaultPriority === 'urgent'}
          onChange={this.props.setPriority}
        />
        <label
          htmlFor="urgent"
        >Urgent</label>
        <input
          className="with-gap"
          name="group3"
          type="radio"
          id="critical"
          checked={defaultPriority === 'critical'}
          onChange={this.props.setPriority}
        />
        <label htmlFor="critical">Critical</label>
      </div>
    );
    return (
      <div id="chat-input">
        <MessageList groupId={this.props.groupId} />
        <MessageInput onSubmit={this.props.sendMessage} />
        <PriorityButtons />
        <AddButton />
      </div>
    );
  }

  /**
   * 
   * @method renderUserModal
   * @returns {Object} a modal component
   * @memberof MessageArea
   */
  renderUserModal() {
    return (
      <AddUserModal groupId={this.props.groupId} />
    );
  }

  /**
   * @method renderCreateGroupModal
   * @returns {Component} a modal comoponent
   * @memberof MessageArea
   */
  renderGroupModal() {
    return (
      <CreateGroupModal />
    );
  }

  /**
   * @returns {Object} component
   * @memberof MessageArea
  */
  render() {
    return (
      <div className="chat-container">
        {this.renderMessageArea()}
        {this.renderUserModal()}
        {this.renderGroupModal()}
      </div>
    );
  }
}

MessageArea.defaultProps = {
  groupId: ''
};

MessageArea.propTypes = {
  groupId: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  defaultPriority: PropTypes.string.isRequired,
  setPriority: PropTypes.func.isRequired
};

export default MessageArea;
