import React, { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import MessageInput from './MessageInput';
import MessageList from './MessageList';
import AddUserModal from './AddUserModal';
import CreateGroupModal from './CreateGroupModal';


/**
 * React component that displays the message section
 * @class MessageArea
 * @extends {Component}
*/
class MessageArea extends Component {
  /**
   * Creates an instance of CreateGroupModal
   * @param {object} props 
   * @memberof MessageArea
   */
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.showInput
    };
  }

  /**
   * @param {object} nextProps
   * @memberof MessageArea
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { showInput } = nextProps;
    this.setState({
      isVisible: showInput
    });
  }

  /**
   *
   * @method renderMessageArea
   * @memberof MessageArea
   * @returns {object} a MessageArea component
  */
  renderMessageArea() {
    const { defaultPriority } = this.props;
    const priorityClassName = className({
      hidden: !this.state.isVisible
    });
    const PriorityButtons = () => (
      <div className={priorityClassName}>
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

    const AddUserButton = () => (
      <div className={priorityClassName}>
        <li>
          <a
            href="#user-to-group"
            className="btn-floating modal-trigger tooltipped float-button"
            data-position="left"
            data-delay="50"
            data-tooltip="add user to group"
          >
            <i
              className="large material-icons"
            >person_add
            </i>
          </a>
        </li>
      </div>
    );

    const CreateGroupButton = () => (
      <div>
        <li><a
          href="#new-group"
          className="btn-floating modal-trigger tooltipped float-button"
          data-position="left"
          data-delay="50"
          data-tooltip="create group"
        ><i className="large material-icons">group_add</i></a></li>
      </div>
    );

    const AddButton = () => (
      <div className="fixed-action-btn add-btn">
        <a
          href="#!"
          className="btn-floating"
        ><i className="large material-icons">add</i></a>
        <ul>
          <AddUserButton />
          <CreateGroupButton />
        </ul>
      </div>
    );
    return (
      <div id="chat-input">
        <MessageList groupId={this.props.groupId} />
        <MessageInput onSubmit={this.props.sendMessage} isVisible={this.state.isVisible} />
        <PriorityButtons />
        <AddButton />
      </div>
    );
  }

  /**
   * 
   * @method renderUserModal
   * @returns {Object} a modal component
   * @memberof MessageArea
   */
  renderUserModal() {
    return (
      <AddUserModal groupId={this.props.groupId} />
    );
  }

  /**
   * @method renderCreateGroupModal
   * @returns {Component} a modal comoponent
   * @memberof MessageArea
   */
  renderGroupModal() {
    return (
      <CreateGroupModal />
    );
  }

  /**
   * @returns {Object} component
   * @memberof MessageArea
  */
  render() {
    return (
      <div className="chat-container">
        {this.renderMessageArea()}
        {this.renderUserModal()}
        {this.renderGroupModal()}
      </div>
    );
  }
}

MessageArea.defaultProps = {
  groupId: ''
};

MessageArea.propTypes = {
  groupId: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  showInput: PropTypes.bool.isRequired,
  defaultPriority: PropTypes.string.isRequired,
  setPriority: PropTypes.func.isRequired
};

export default MessageArea;
