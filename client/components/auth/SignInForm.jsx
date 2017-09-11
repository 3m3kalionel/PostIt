import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Proptypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import 'font-awesome/css/font-awesome.css';

import { signIn, googleAuth } from '../../actions/userActions';


/**
 * React component that displays the sign in form
 * @class SignInForm
 * @extends {Component}
 */
class SignInForm extends Component {
  /**
   * Creates an instance of ForgotPassword.
   * @param {Object} props 
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
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  /**
  * triggers an action that signs the user into the app
  * @method onSubmit
  * @param {event} event
  * @memberof SignInForm
  * @return {void}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.signIn(this.state)
      .then(() => {
        browserHistory.push('/dashboard');
      });
  }

  googleSignIn(response) {
    console.log('response', response);
    const userData = {
      email: response.profileObj.email,
      username: response.profileObj.givenName
    };
    this.props.googleAuth(userData)
      .then(() => {
        browserHistory.push('/dashboard');
      });
  }

  /**
  * updates state as user's input changes
  * @method handleInputChange
  * @param {event} event
  * @memberof SigninForm
  * @return {void}
  */
  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  /**
   * @returns {Object} component
   * @memberof SigninForm
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
          <GoogleLogin
            clientId="16460409560-2ea3rrvh3g3306enntrekk20be52djgr.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={this.googleSignIn}
            onFailure={this.googleSignIn}
          >
            <i className="fa fa-google" aria-hidden="true" /> Sign in with Google
          </GoogleLogin>
        </div>
      </form>

    );
  }
}

const mapStateToProps = state => ({
  error: state.errors.error
});

const mapDispatchToProps = dispatch => ({
  signIn: userData => dispatch(signIn(userData)),
  googleAuth: userData => dispatch(googleAuth(userData))
});

SignInForm.propTypes = {
  signIn: Proptypes.func.isRequired,
  forgotPassword: Proptypes.func.isRequired,
  googleAuth: Proptypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

