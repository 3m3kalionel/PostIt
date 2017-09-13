import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { addMember, searchUsers, clearMemberSearchList } from '../../actions/memberActions';

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
      query: '',
      offset: 0,
      limit: 3,
      displayPagination: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.baseState = this.state;
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
        this.props.search(this.state.query, this.state.offset, this.state.limit);
      });
    }
  }

  onClick(event) {
    event.preventDefault();
    this.props.addMember(this.props.groupId, event.target.name);
  }

  resetForm() {
    this.setState(this.baseState);
    this.props.clearSearchList();
  }

  handleInputChange(event) {
    event.preventDefault();
    if (event.target.value.length === 0) {
      return this.resetForm();
    }
    this.setState({
      [event.target.name]: event.target.value,
      displayPagination: true
    }, () => {
      this.props.search(this.state.query, 0, this.state.limit);
    });
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = this.state.limit * selected;
    this.setState({ offset }, () => {
      this.props.search(this.state.query, this.state.offset, this.state.limit);
    });
  }

  render() {
    const { searchResults } = this.props;
    const searchComponent = Object.keys(searchResults).length ?
      searchResults.rows.map((result, index) =>
        (
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
        )
      ) : null;

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
              {
                this.state.displayPagination ?
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={<a href="">...</a>}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(searchResults.count / this.state.limit)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  />
                  : null
              }
            </form>

          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={this.resetForm}
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
    search: (username, offset, limit) => dispatch(searchUsers(username, offset, limit)),
    clearSearchList: () => dispatch(clearMemberSearchList())
  };
}

AddUserModal.defaultProps = {
  group: {
    members: []
  },
  searchResults: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
