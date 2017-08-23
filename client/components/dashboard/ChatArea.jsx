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


// should the list items be contained in a div? 
// create the method to handle user searrch here. pass the method as a prop to addUserModal. Pass the list of results to AddUserModal 

  renderAddUserModal () {
    return (
      <AddUserModal groupId={this.props.groupId} />
    )
  }

  renderCreateGroupModal () {
    return (
      <CreateGroupModal />
    )
  }

  render() {
    return (
      <div>
        {this.renderChatArea()}
        {this.renderAddUserModal()}
        {this.renderCreateGroupModal()}
      </div>
    );
  }
}

export default ChatArea;

// nothing