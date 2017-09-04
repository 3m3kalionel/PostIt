import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';

import { resetPassword } from '../../actions/userActions';

/**
 * React component that displays the reset password form
 * @class ResetPassword
 * @extends {Component}
 */
class ResetPassword extends Component {
  /**
   * Creates an instance of ResetPassword.
   * @param {Object} props 
   * @memberof ResetPassword
   */
  constructor(props) {
    super(props);

    this.state = {
      newPassword: '',
      retypeNewPassword: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
  * triggers an action that resets a user's password
  * @method onSubmit
  * @param {event} event
  * @memberof LandingPage
  * @return {void}
  */
  onSubmit(event) {
    event.preventDefault();
    const token = this.props.params.token;
    this.props.resetPassword(token, this.state);
  }

  /**
  * updates state as user's input changesd
  * @method handleInputChange
  * @param {event} event
  * @memberof LandingPage
  * @return {void}
  */
  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @returns {Object} component
   * @memberof ChatArea
  */
  render() {
    return (
      <div className="reset-container0">
        <form onSubmit={this.onSubmit}>
          <h4>Reset password</h4>
          <div className="input-field col-s6">
            <input
              id="newpassword"
              type="password"
              placeholder="enter new password"
              name="newPassword"
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="input-field col-s6">
            <input
              id="retypenewpassword"
              type="password"
              placeholder="retype your password"
              name="retypeNewPassword"
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div id="button-div">
            <button className="btn" type="submit">reset</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetPassword: (token, resetDetails) =>
    dispatch(resetPassword(token, resetDetails))
});

ResetPassword.propTypes = {
  resetPassword: Proptypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ResetPassword);

