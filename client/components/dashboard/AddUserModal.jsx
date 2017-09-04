import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addMember, searchUsers } from '../../actions/memberActions';

/**
 * React component that adds a registered user to a groups
 * @class ForgotPassword
 * @extends {Component}
 */
class AddUserModal extends Component {
  /**
   * Creates an instance of ForgotPassword
   * @param {Object} props 
   * @memberof ForgotPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @param {object} nextProps
   * @memberof AddUserModel
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { members: memberList } = this.props.group;
    const { members: newMemberList } = nextProps.group;

    if (newMemberList.length > memberList.length) {
      this.setState({
        query: ''
      }, () => {
        this.props.search(this.state.query);
      });
    }
  }

  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      this.props.search(this.state.query);
    });
  }

  onClick(event) {
    event.preventDefault();
    this.props.addMember(this.props.groupId, event.target.name);
  }

  render() {
    const { searchResults } = this.props;
    const searchComponent = searchResults.map((result, index) => {
      return (
        <div className="user-list" key={index}>
          <ul className="member-list">
            <li className="username">
              {result.username}
              <button
                className="btn waves-effect waves-light right"
                name={result.id}
                onClick={this.onClick}
              >Add</button>
            </li>
          </ul>
        </div>
      );
    });

    return (
      <div id="user-to-group" className="modal">
        <div className="modal-content">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    name="query"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                  />
                  <label htmlFor="icon_prefix">Username</label>
                </div>

                {searchComponent}
              </div>
            </form>

          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >Cancel
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.groups[ownProps.groupId],
    searchResults: state.members.result
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMember: (groupId, userId) => dispatch(addMember(groupId, userId)),
    search: (username) => dispatch(searchUsers(username))
  };
}

AddUserModal.defaultProps = {
  group: {
    members: []
  },
  searchResults: []
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
