import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * @class MessageInput
 * @extends {Component}
 */
class MessageInput extends Component {
  /**
   * Creates an instance of ChatInput.
   * @param {object} props 
   * @memberof ChatInput
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isVisible: props.isVisible
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isVisible } = nextProps;
    this.setState({
      isVisible
    });
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

    const inputClassnames = classNames({
      hidden: !this.state.isVisible,
      'input-container': true,
    });

    return (
      <div className={inputClassnames}>
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
  onSubmit: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default MessageInput;
