import React, { Component } from 'react';
import AddButton from './AddButton.jsx';
import ChatInput from './ChatInput.jsx';
import MessageList from './MessageList.jsx';

class ChatArea extends Component {
  render() {
    return (
      <div className="col m8" id="chat-input">
        <MessageList />
        <ChatInput />
        <AddButton />
      </div>
    );
  }
}

export default ChatArea;
