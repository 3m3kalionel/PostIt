import React, { Component } from 'react';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  handleInputChange(event) {
    this.setState({ message: event.target.value });
  }

  clearMessage() {
    this.setState({ message: '' });
  }

  render() {
    const { onSubmit } = this.props;
    const { message } = this.state;
    return (
      <div>
        <div id="message-input" className="col l12">
          <textarea type="text" onChange={this.handleInputChange} value={message} ></textarea>
        </div>
        <button className="waves-effect waves-light btn" onClick={() => onSubmit(message, this.clearMessage)}>
          Send
        </button>
      </div>
    );
  }
}

export default ChatInput;

// nothing