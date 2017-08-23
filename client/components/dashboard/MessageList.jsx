import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listMessages } from '../../actions/messageActions';
import { bindActionCreators } from 'redux';

class MessageList extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.groupId !== nextProps.groupId){
      this.props.getMessages(nextProps.groupId);
    }
  }

  render () {
  const { messages } = this.props.group;
  let messageComponent;
    if (Array.isArray(messages) && messages.length > 0) {
      messageComponent = messages.map((message) => {
        return (
          <div className="card blue-grey darken-1" key={message.id}>
            <div className="card-content">
              <p>{message.content}</p>
            </div>
          </div>
        )
      });
    } else {
      messageComponent = <p>No message to display</p>
    }

    return (
      <div className="messages message-list-container">
        <ul id="message-list">
          <li>
            <div className="row">
              <div className="col l12">
                  {messageComponent}
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

MessageList.defaultProps = {
  group: {}
}

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.groups[ownProps.groupId || 0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: (bindActionCreators)(listMessages, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
