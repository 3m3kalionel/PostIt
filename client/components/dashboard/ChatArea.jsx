import React, { Component } from 'react';
import Proptypes from 'prop-types';

import AddButton from './AddButton';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import AddUserModal from './AddUserModal';
import CreateGroupModal from './CreateGroupModal';

/**
 * React component that displays the chat section
 * @class
 * @extends {Component}
*/
class ChatArea extends Component {
  /**
   *
   * @method renderChatArea
   * @memberof ChatArea
   * @returns {object} a chat area component
  */
  renderChatArea() {
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
        <ChatInput onSubmit={this.props.sendMessage} />
        <PriorityButtons />
        <AddButton />
      </div>
    );
  }

  /**
   * 
   * @method renderUserModal
   * @returns {Object} a modal component
   * @memberof ChatArea
   */
  renderUserModal() {
    return (
      <AddUserModal groupId={this.props.groupId} />
    );
  }

  /**
   * @method renderCreateGroupModal
   * @returns {Component} a modal comoponent
   * @memberof ChatArea
   */
  renderGroupModal() {
    return (
      <CreateGroupModal />
    );
  }

  /**
   * @returns {Object} component
   * @memberof ChatArea
  */
  render() {
    return (
      <div className="chat-container">
        {this.renderChatArea()}
        {this.renderUserModal()}
        {this.renderGroupModal()}
      </div>
    );
  }
}

ChatArea.defaultProps = {
  groupId: ''
};

ChatArea.propTypes = {
  groupId: Proptypes.string,
  sendMessage: Proptypes.func.isRequired,
  defaultPriority: Proptypes.string.isRequired,
  setPriority: Proptypes.func.isRequired
};

export default ChatArea;
