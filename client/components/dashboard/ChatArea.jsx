// import React, { Component } from 'react';
// import Proptypes from 'prop-types';
// import AddButton from './AddButton';
// import ChatInput from './ChatInput';
// import MessageList from './MessageList';
// import AddUserModal from './AddUserModal';
// import CreateGroupModal from './CreateGroupModal';

// const PriorityButtons = () => (
//   <div>
//     <input className="with-gap" name="group3" type="radio" id="normal" />
//     <label htmlFor="normal">Normal</label>
//     <input className="with-gap" name="group3" type="radio" id="urgent" />
//     <label htmlFor="urgent">Urgent</label>
//     <input className="with-gap" name="group3" type="radio" id="critical" />
//     <label htmlFor="critical">Critical</label>
//   </div>
// );

// const ChatDiv = (props) => {
//   const { sendMessage } = props;
//   return (
//     <div>
//       <ChatInput onSubmit={sendMessage} />
//       <PriorityButtons />
//       <AddButton />
//     </div>
//   );
// };

// ChatDiv.propTypes = {
//   sendMessage: Proptypes.func.isRequired
// };

// /**
//  * React component that displays the chat section
//  * @class
//  * @extends {Component}
// */
// class ChatArea extends Component {
//   /**
//    * @function renderCreateGroupModal
//    * @returns {Component} a modal comoponent
//    */
//   renderCreateGroupModal() { // eslint-disable-line class-methods-use-this
//     return (
//       <CreateGroupModal />
//     );
//   }

//   /**
//    * @function renderAddUserModal
//    * @returns {Component} a modal comoponent
//    */
//   renderAddUserModal() {
//     return (
//       <AddUserModal groupId={this.props.groupId} />
//     );
//   }

//   /**
//    * @method renderChatArea
//    * @memberof ChatArea
//    * @returns {object} a chat area component
//   */
//   renderChatArea() {
//     return (
//       <div className="col m8" id="chat-input">
//         <MessageList groupId={this.props.groupId} />
//         <ChatDiv sendMessage={this.props.sendMessage} groupId={this.props.groupId} />
//       </div>
//     );
//   }

//   /**
//    * @method renderEmptyArea
//    * @memberof ChatArea
//    * @returns {object} a chat area component
//   */
//   renderEmptyArea() { // eslint-disable-line class-methods-use-this
//     return (
//       <div className="col m8 empty-area">
//         <p>Select a group from the sidebar to begin.</p>
//       </div>
//     );
//   }


//   /**
//    * @returns {Object} a JSX object
//    * @memberof ChatArea
//    */
//   render() {
//     return (
//       <div>
//         {this.props.groupId ? this.renderChatArea() : this.renderEmptyArea()}
//         {this.renderAddUserModal()}
//         {this.renderCreateGroupModal()}
//       </div>
//     );
//   }
// }

// ChatArea.propTypes = {
//   groupId: Proptypes.string,
//   sendMessage: Proptypes.func.isRequired
// };

// export default ChatArea;


import React, { Component } from 'react';
import Proptypes from 'prop-types';

import AddButton from './AddButton';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import AddUserModal from './AddUserModal';
import CreateGroupModal from './CreateGroupModal';

/**
 * React component that displays the chat section
 * @class
 * @extends {Component}
*/
class ChatArea extends Component {
  /**
   *
   * @method renderChatArea
   * @memberof ChatArea
   * @returns {object} a chat area component
  */
  renderChatArea() {
    const { defaultPriority } = this.props;
    const PriorityButtons = () => (
      <div>
        <input className="with-gap" name="group3" type="radio" id="normal" checked={defaultPriority === 'normal'} onChange={this.props.setPriority} />
        <label htmlFor="normal">Normal</label>
        <input className="with-gap" name="group3" type="radio" id="urgent" checked={defaultPriority === 'urgent'} onChange={this.props.setPriority} />
        <label htmlFor="urgent">Urgent</label>
        <input className="with-gap" name="group3" type="radio" id="critical" checked={defaultPriority === 'critical'} onChange={this.props.setPriority} />
        <label htmlFor="critical">Critical</label>
      </div>
    );
    return (
      <div id="chat-input">
        <MessageList groupId={this.props.groupId} />
        <ChatInput onSubmit={this.props.sendMessage} />
        <PriorityButtons />
        <AddButton />
      </div>
    );
  }

  /**
   * 
   * @method renderUserModal
   * @returns {Object} a modal component
   * @memberof ChatArea
   */
  renderUserModal() {
    return (
      <AddUserModal groupId={this.props.groupId} />
    );
  }

  /**
   * @method renderCreateGroupModal
   * @returns {Component} a modal comoponent
   * @memberof ChatArea
   */
  renderGroupModal() {
    return (
      <CreateGroupModal />
    );
  }

  /**
   * @returns {Object} component
   * @memberof ChatArea
  */
  render() {
    return (
      <div className="chat-container">
        {this.renderChatArea()}
        {this.renderUserModal()}
        {this.renderGroupModal()}
      </div>
    );
  }
}

ChatArea.defaultProps = {
  groupId: ''
};

ChatArea.propTypes = {
  groupId: Proptypes.string,
  sendMessage: Proptypes.func.isRequired,
  defaultPriority: Proptypes.string.isRequired,
  setPriority: Proptypes.func.isRequired
};

export default ChatArea;
