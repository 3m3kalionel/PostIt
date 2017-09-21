import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class MessageInput
 * @extends {Component}
 */
class MessageInput extends Component {
  /**
   * Creates an instance of MessageInput.
   * @param {object} props 
   * @memberof MessageInput
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
   * @memberof MessageInput
   * @param {object} event
   * @returns {undefined}
   */
  handleInputChange(event) {
    this.setState({ message: event.target.value });
  }

  /**
   * clears the text input field
   * @method clearMessage
   * @memberof MessageInput
   * @param {object} event
   * @returns {undefined}
   */
  clearMessage() {
    this.setState({ message: '' });
  }

  /**
   * @returns {Object} component
   * @memberof MessageInput
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

MessageInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default MessageInput;
