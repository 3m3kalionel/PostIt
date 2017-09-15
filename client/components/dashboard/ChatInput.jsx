import React, { Component } from 'react';
import Proptypes from 'prop-types';

/**
 * @class ChatInput
 * @extends {Component}
 */
class ChatInput extends Component {
  /**
   * Creates an instance of ChatInput.
   * @param {any} props 
   * @memberof ChatInput
   */
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  /**
   * 
   * @method handleInputChange
   * @memberof ChatInput
   * @param {any} event
   * @returns {undefined}
   */
  handleInputChange(event) {
    this.setState({ message: event.target.value });
  }

  /**
   * 
   * @method clearMessage
   * @memberof ChatInput
   * @param {any} event
   * @returns {undefined}
   */
  clearMessage() {
    this.setState({ message: '' });
  }

  /**
   * 
   * @returns {Object} a JSX Object
   * @memberof ChatInput
   */
  render() {
    const { onSubmit } = this.props;
    const { message } = this.state;
    return (
      <div className="input-container">
        <div id="message-input">
          <textarea type="text" onChange={this.handleInputChange} value={message} />
        </div>
        <button
          className="waves-effect waves-light btn"
          onClick={() =>
            onSubmit(message, this.clearMessage)}>
          Send
        </button>
      </div>
    );
  }
}

export default ChatInput;
