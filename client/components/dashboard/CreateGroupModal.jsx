import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createGroup } from '../../actions/groupActions';

/**
 * React modal component that creates a new group
 * @class ForgotPassword
 * @extends {Component}
 */
class CreateGroupModal extends Component {
  /**
   * Creates an instance of CreateGroupModal
   * @param {object} props 
   * @memberof CreateGroupModal
   */
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.baseState = this.state;
    this.resetForm = this.resetForm.bind(this);
  }

  /**
  * triggers an action that creates a group
  * @method onSubmit
  * @param {object} event
  * @memberof CreateGroupModal
  * @return {undefined}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.createGroup(this.state)
      .then(() => {
        if (this.props.error && this.props.error.Error) {
          Materialize.toast(this.props.error.Error, 3000, 'rounded error-toast');
        } else {
          Materialize.toast('Group created', 3000, 'rounded success-toast');
          this.resetForm();
          $('.modal').modal('close');
        }
      });
  }

  /**
  * clears form input field and search results  
  * @method resetForm
  * @param {object} event
  * @memberof CreateGroupModal
  * @return {undefined}
  */
  resetForm() {
    this.setState(this.baseState);
  }

  /**
  * updates state as user's input changes
  * @method handleInputChange
  * @param {object} event
  * @memberof CreateGroupModal
  * @return {undefined}
  */
  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /**
   * @returns {object} component
   * @memberof CreateGroupModal
   */
  render() {
    return (
      <div id="new-group" className="modal">
        <div className="modal-content">
          <div className="row">
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    onChange={this.handleInputChange}
                    id="name"
                    value={this.state.name}
                    type="text"
                    required
                  />
                  <label htmlFor="icon_prefix">Group name</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">edit</i>
                  <input
                    onChange={this.handleInputChange}
                    id="description"
                    value={this.state.description}
                    type="tel"
                    required
                  />
                  <label htmlFor="icon_telephone">Description</label>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button
                      className="btn cyan waves-effect waves-light right"
                      type="submit"
                      name="action"
                    >Create
                      <i className="mdi-content-send right" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-action modal-close waves-effect waves-green btn-flat"
            onClick={this.resetForm}
          >Cancel</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.errors.error
});

const mapDispatchToProps = dispatch => ({
  createGroup: groupData => dispatch(createGroup(groupData))
});

CreateGroupModal.propTypes = {
  createGroup: PropTypes.func.isRequired,
  error: PropTypes.shape({ Error: PropTypes.string }).isRequired
};

CreateGroupModal.defaultProps = {
  error: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupModal);
