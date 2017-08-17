import React, { Component } from 'react';
import AddButton from './AddButton.jsx';
import ChatInput from './ChatInput.jsx';
import MessageList from './MessageList.jsx';
import AddUserModal from './AddUserModal.jsx';
import CreateGroupModal from './CreateGroupModal.jsx';

class ChatArea extends Component {
  renderChatArea() {
    return (
      <div className="col m8" id="chat-input">
        <MessageList groupId={this.props.groupId}/>
        <ChatInput onSubmit={this.props.sendMessage}/>
        <AddButton />
      </div>
    );
  }

  renderUserModal () {
    return (
      <AddUserModal />
    )
  }

  renderGroupModal () {
    return (
      <CreateGroupModal />
    )
  }

  render() {
    return (
      <div>
        {this.renderChatArea()}
        {this.renderUserModal()}
        {this.renderGroupModal()}
      </div>
    );
  }
}

export default ChatArea;