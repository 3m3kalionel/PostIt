import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { verifyUser } from '../../actions/userActions';

/**
 * React component that displays the forgot password form
 * @class ForgotPassword
 * @extends {Component}
 */
class ForgotPassword extends Component {
  /**
   * Creates an instance of ForgotPassword
   * @param {Object} props 
   * @memberof ForgotPassword
   */
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
  * triggers an action that sends a user an email
  * @method onSubmit
  * @param {object} event
  * @memberof ForgotPassword
  * @return {undefined}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.verifyUser(this.state).then(() => {
      Materialize.toast('Password reset link has been sent to your email', 4000, 'success-toast');
    }).catch(Materialize.toast(''));
  }

  /**
  * updates state as user's input changes
  * @method handleInputChange
  * @param {object} event
  * @memberof ForgotPassword
  * @return {undefined}
  */
  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /**
   * @returns {object} component
   * @memberof ForgotPassword
  */
  render() {
    return (
      <div className="reset-container0">
        <form onSubmit={this.onSubmit} id="forgot-password">
          <h4>forgot password</h4>
          <div className="input-field col-s6">
            <input
              id="email"
              type="email"
              className="validate"
              onChange={this.handleInputChange}
              data-error="wrong email format"
              placeholder="enter your email"
              value={this.state.email}
              required
            />
          </div>
          <div id="button-div">
            <button className="btn" type="submit">Submit</button>
          </div>
          <div
            id="button-div"
            onClick={() => this.props.revertForgotPassword()}
          >
            <button className="btn">cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  verifyUser: email => dispatch(verifyUser(email))
});

ForgotPassword.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  revertForgotPassword: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
