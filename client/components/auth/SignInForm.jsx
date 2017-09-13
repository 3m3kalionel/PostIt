import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Proptypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import { signIn } from '../../actions/userActions';

/**
 * React component that displays the sign in form
 * @class SignInForm
 * @extends {Component}
 */
class SignInForm extends Component {
  /**
   * Creates an instance of SignInForm.
   * @param {object} props 
   * @memberof SigninForm
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
  * triggers an action that signs the user into the app
  * @method onSubmit
  * @param {object} event
  * @memberof SignInForm
  * @returns {undefined}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.signIn(this.state)
      .then(() => {
        browserHistory.push('/dashboard');
      });
  }

  /**
  * updates state as user's input changes
  * @method handleInputChange
  * @param {object} event
  * @memberof SignInForm
  * @return {undefined}
  */
  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  /**
   * @returns {object} component
   * @memberof SignInForm
  */
  render() {
    return (
      <form className="auth-form" onSubmit={this.onSubmit}>
        <h3>Welcome</h3>
        <div className="input-field">
          <input
            onChange={this.handleInputChange}
            id="username"
            type="text"
            className="validate"
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field">
          <input
            onChange={this.handleInputChange}
            id="password"
            type="password"
            className="validate"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div
          onClick={() => this.props.forgotPassword()}
        >
          <a
            className="waves-effect waves-light"
            id="forgot-password"
          >Forgot Password?</a>
        </div>
        <div id="button-div">
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  error: state.errors.error
});

const mapDispatchToProps = dispatch => ({
  signIn: userData => dispatch(signIn(userData))
});

SignInForm.propTypes = {
  signIn: Proptypes.func.isRequired,
  forgotPassword: Proptypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
