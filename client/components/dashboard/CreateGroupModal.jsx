import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createGroup } from '../../actions/groupActions.js';

class CreateGroupModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createGroup(this.state);
  }

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
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="icon_prefix">Group name</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">edit</i>
                  <input
                    onChange={this.handleInputChange}
                    id="description"
                    type="tel"
                    className="validate"
                  />
                  <label htmlFor="icon_telephone">Description</label>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button
                      className="btn cyan waves-effect waves-light right"
                      type="submit"
                      name="action"
                    >Submit
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupModal);
