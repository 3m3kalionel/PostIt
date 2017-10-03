import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GroupsList from './GroupsList';
import MessageArea from './MessageArea';
import { createMessage } from '../../actions/messageActions';
import { listGroups } from '../../actions/groupActions';

/**
 * React component that displays the dashboard
 * @class Dashboard
 * @extends {Component}
*/
export class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {object} props 
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal',
      showInput: false
    };
    this.selectGroup = this.selectGroup.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.setPriority = this.setPriority.bind(this);
  }

  /**
   * makes jquery function available on component mount
   * @method componentDidMount
   * @memberof Dashboard
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.listGroups();
    $('.modal').modal({
      dismissible: false
    });
  }

  /**
   * sets the message priority on click of a radio button
   * @method setPriority
   * @memberof Dashboard
   * @param {object} event
   * @returns {undefined}
   */
  setPriority(event) {
    const priority = event.target.id;
    this.setState({
      priority
    });
  }

  /**
   * sends the message provided in the input area
   * @method sendMessage
   * @memberof Dashboard
   * @param {string} content
   * @param {Function} callback
   * @returns {undefined}
   */
  sendMessage(content, callback) {
    callback();
    const members = this.props.groupsData[this.state.selectedGroup].members;
    const { priority } = this.state;
    this.props.createMessage(this.state.selectedGroup, { content, members, priority });
  }

  /**
   * changes the state of selected group
   * @method selectGroup
   * @memberof Dashboard
   * @param {Object} event
   * @returns {undefined}
   */
  selectGroup(event) {
    event.preventDefault();
    this.setState({ selectedGroup: event.target.id });
    this.setState({
      selectedGroup: event.target.id,
      showInput: true
    });
  }

  /**
   * @memberof Dashboard
   * @returns {object} component
   */
  render() {
    return (
      <div id="two-section-page">
        <GroupsList
          id="groups-list"
          selectGroup={this.selectGroup}
          groups={this.props.groups}
          activeId={this.state.selectedGroup}
        />
        <MessageArea
          id="message-area"
          groupId={this.state.selectedGroup}
          sendMessage={this.sendMessage}
          setPriority={this.setPriority}
          defaultPriority={this.state.priority}
          showInput={this.state.showInput}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    groups: state.user.groups,
    groupsData: state.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (bindActionCreators)(createMessage, dispatch),
    listGroups: (bindActionCreators)(listGroups, dispatch)
  };
};

Dashboard.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.int,
    name: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  })).isRequired,
  listGroups: PropTypes.func.isRequired,
  groupsData: PropTypes.shape({}).isRequired,
  createMessage: PropTypes.func.isRequired
};

Dashboard.defaultProps = {
  groups: []
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
