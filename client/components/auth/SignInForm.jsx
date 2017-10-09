import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import { signIn, googleAuth } from '../../actions/userActions';

/**
 * React component that displays the sign in form
 * @class SignInForm
 * @extends {Component}
 */
export class SignInForm extends Component {
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
    this.googleSignIn = this.googleSignIn.bind(this);
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
        if (this.props.error.message || this.props.error.Error) {
          Materialize.toast(this.props.error.message || this.props.error.Error,
            3000, 'rounded error-toast');
        } else {
          Materialize.toast('Login successful', 3000, 'rounded success-toast');
          browserHistory.push('/dashboard');
        }
      });
  }

  /**
   * authenticates google users and signs them up /signs them in
   * @method googleSignIn
   * @param {object} response 
   * @memberof SignInForm
   * @returns {undefined}
   */
  googleSignIn(response) {
    if (response.accessToken) {
      const userDetails = {
        email: response.profileObj.email,
        username: response.profileObj.givenName
      };
      this.props.googleAuth(userDetails)
        .then(() => {
          if (this.props.error && this.props.error.Error) {
            Materialize.toast('Login error', 3000, 'rounded error-toast');
          } else {
            Materialize.toast(this.props.auth.message, 3000,
              'rounded success-toast');
            browserHistory.push('/dashboard');
          }
        });
    }
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
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field">
          <input
            onChange={this.handleInputChange}
            id="password"
            type="password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <a
            tabIndex={0}
            role="link"
            onClick={() => this.props.forgotPassword()}
            className="waves-effect waves-light"
            id="forgot-password"
          >Forgot Password?</a>
        </div>
        <div id="button-div">
          <button className="btn" type="submit">Login</button>
          <GoogleLogin
          // eslint-disable-next-line
            clientId="16460409560-2ea3rrvh3g3306enntrekk20be52djgr.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={this.googleSignIn}
            onFailure={this.googleSignIn}
          >
            <i className="fa fa-google" aria-hidden="true" />
            Sign in with Google
          </GoogleLogin>
        </div>
      </form>

    );
  }
}

const mapStateToProps = state => ({
  error: state.errors.error,
  auth: state.user
});

const mapDispatchToProps = dispatch => ({
  signIn: userDetails => dispatch(signIn(userDetails)),
  googleAuth: userDetails => dispatch(googleAuth(userDetails))
});

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  googleAuth: PropTypes.func.isRequired,
  error: PropTypes.shape({ message: PropTypes.string, Error: PropTypes.string
  }).isRequired,
  auth: PropTypes.shape({ message: PropTypes.string }).isRequired
};

SignInForm.defaultProps = {
  error: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

