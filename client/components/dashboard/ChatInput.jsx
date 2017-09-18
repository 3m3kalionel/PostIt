import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class ChatInput
 * @extends {Component}
 */
class ChatInput extends Component {
  /**
   * Creates an instance of ChatInput.
   * @param {object} props 
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
   * updates state as user's input changes
   * @method handleInputChange
   * @memberof ChatInput
   * @param {object} event
   * @returns {undefined}
   */
  handleInputChange(event) {
    this.setState({ message: event.target.value });
  }

  /**
   * clears the text input field
   * @method clearMessage
   * @memberof ChatInput
   * @param {object} event
   * @returns {undefined}
   */
  clearMessage() {
    this.setState({ message: '' });
  }

  /**
   * @returns {Object} component
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
            onSubmit(message, this.clearMessage)}
        >
          Send
        </button>
      </div>
    );
  }
}

ChatInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ChatInput;
