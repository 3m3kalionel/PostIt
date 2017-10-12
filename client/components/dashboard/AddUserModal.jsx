import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import className from 'classnames';

import { addMember, searchUsers, clearMemberSearchList }
  from '../../actions/memberActions';

/**
 * React component that adds a registered user to a groups
 * @class AddUserModal
 * @extends {Component}
 */
export class AddUserModal extends Component {
  /**
   * Creates an instance of AddUserModal
   * @param {Object} props 
   * @memberof ForgotPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      offset: 0,
      limit: 3,
      displayPagination: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.baseState = this.state;
  }

  /**
   * @param {object} nextProps
   * @memberof AddUserModal
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { members: memberList } = this.props.group;
    const { members: newMemberList } = nextProps.group;

    if (memberList && newMemberList && newMemberList.length >
      memberList.length) {
      this.setState({
        query: ''
      });
    }
  }

  /**
  * performs an action on the click of a button
  * @method onClick
  * @param {object} event
  * @memberof AddUserModal
  * @return {undefined}
  */
  onClick(event) {
    event.preventDefault();
    this.props.addMember(this.props.groupId, event.target.name)
      .then(() => {
        if (this.props.error && this.props.error.message) {
          Materialize.toast(this.props.error.message, 3000, 'error-toast');
        } else {
          Materialize.toast(this.props.group.message, 3000, 'success-toast');
          this.resetForm();
        }
      });
  }

  /**
  * clears form input field and search results
  * @method resetForm
  * @param {object} event
  * @memberof AddUserModal
  * @return {undefined}
  */
  resetForm() {
    this.setState(this.baseState);
    this.props.clearSearchList();
  }

  /**
  * updates state as user's input changes
  * @method handleInputChange
  * @param {object} event
  * @memberof AddUserModal
  * @return {undefined}
  */
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

  /**
  * switches page view on click of a button
  * @method handlePageClick
  * @param {object} data
  * @memberof AddUserModal
  * @return {undefined}
  */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = this.state.limit * selected;
    this.setState({ offset }, () => {
      this.props.search(this.state.query, this.state.offset, this.state.limit);
    });
  }

  /**
   * @returns {object} component
   * @memberof AddUserModal
   */
  render() {
    const { searchResults } = this.props;
    const paginationClassname = className({
      hidden: this.state.query.length < 1
    });
    const searchComponent = Object.keys(searchResults).length ?
      searchResults.rows.map((result) => {
        const member = this.props.group.members.some(mem => mem.username ===
        result.username);
        const buttonText = member ? 'Member' : 'Add';
        return (
          <div className="user-list" key={`${result.username}-${result.id}`}>
            <ul className="member-list">
              <li className="username">
                {result.username}
                { buttonText !== 'Member'
                  ? <button
                    id="add-button"
                    className="btn waves-effect waves-light right"
                    name={result.id}
                    onClick={this.onClick}
                  >{buttonText}</button>
                  :
                  <span id="member-text">{buttonText}</span>
                }
              </li>
            </ul>
          </div>
        );
      }
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
                  <div className={paginationClassname}>
                    <ReactPaginate
                      previousLabel={'<'}
                      nextLabel={'>'}
                      breakLabel={<a href="">...</a>}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(searchResults.count /
                      this.state.limit)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />
                  </div>
                  : null
              }
            </form>

          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={this.resetForm}
            // eslint-disable-next-line
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >Cancel
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  error: state.errors.error,
  group: state.groups[ownProps.groupId],
  searchResults: state.members.result
});

const mapDispatchToProps = dispatch => ({
  addMember: (groupId, userId) => dispatch(addMember(groupId, userId)),
  search: (username, offset, limit) => dispatch(searchUsers(username, offset,
    limit)),
  clearSearchList: () => dispatch(clearMemberSearchList())
});

AddUserModal.defaultProps = {
  group: {
    members: []
  },
  searchResults: {},
  error: {},
  groupId: PropTypes.oneOfType([React.PropTypes.number,
    React.PropTypes.string]),
};

AddUserModal.propTypes = {
  groupId: PropTypes.string,
  group: PropTypes.oneOfType([PropTypes.object]),
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  search: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  clearSearchList: PropTypes.func.isRequired,
  searchResults: PropTypes.shape([])
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
