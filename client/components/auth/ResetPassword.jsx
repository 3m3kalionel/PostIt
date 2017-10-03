import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import { resetPassword } from '../../actions/userActions';

/**
 * React component that displays the password reset form
 * @class ResetPassword
 * @extends {Component}
 */
export class ResetPassword extends Component {
  /**
   * Creates an instance of ResetPassword.
   * @param {object} props 
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
  * @param {object} event
  * @memberof ResetPassword
  * @returns {undefined}
  */
  onSubmit(event) {
    event.preventDefault();
    const token = this.props.params.token;
    this.props.resetPassword(token, this.state)
      .then(() => {
        Materialize.toast('Password reset successfully', 3000, 'success-toast');
        browserHistory.push('/dashboard');
      }).catch(error => Materialize.toast(error.message, 3000, 'rounded error-toast'));
  }

  /**
  * updates state as user's input changes
  * @method handleInputChange
  * @param {object} event
  * @memberof ResetPassword
  * @returns {undefined}
  */
  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @returns {object} component
   * @memberof ResetPassword
  */
  render() {
    return (
      <div className="reset-container0">
        <form id="reset-password" onSubmit={this.onSubmit}>
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
  resetPassword: PropTypes.func.isRequired,
  params: PropTypes.shape({ token: PropTypes.string }).isRequired
};

export default connect(null, mapDispatchToProps)(ResetPassword);

