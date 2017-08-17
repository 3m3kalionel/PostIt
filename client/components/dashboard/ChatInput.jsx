import React, { Component } from 'react';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  clearMessage() {
    this.setState({ message: '' });
  }

  render() {
    const { onSubmit } = this.props;
    const { message } = this.state;
    console.log('message', message);
    return (
      <div>

        {/*<div id="message-input" class="col l12">
          <textarea></textarea>
        </div>*/}
        <div id="message-input" class="col l12">
          <textarea type="text" onChange={this.handleChange} value={message} ></textarea>
          </div>
          <button className="waves-effect waves-light btn" onClick={() => onSubmit(message, this.clearMessage)}>
            Send
          </button>
      </div>
    );
  }
}

export default ChatInput;