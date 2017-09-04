import React, { Component } from 'react';

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import ForgotPassword from './ForgotPassword';

/**
 * @class LandingPage
 * @extends {Component}
 */
class LandingPage extends Component {
  /**
   * Creates an instance of ResetPassword.
   * @param {Object} props 
   * @memberof ResetPassword
   */
  constructor() {
    super();
    this.state = {
      forgot: false,
    };
    this.forgotPassword = this.forgotPassword.bind(this);
    this.revertForgotPassword = this.revertForgotPassword.bind(this);
  }

  /**
   * makes jquery function available on component mount
   * @method componentDidMount
   * @memberof LandingPage
   * @return {void}
   */
  componentDidMount() {
    $('ul.tabs').tabs();
  }

  /**
   * makes jquery function available on component mount
   * @method componentDidMount
   * @memberof LandingPage
   * @return {void}
   */
  componentDidUpdate() {
    $('ul.tabs').tabs();
  }

  /**
   * changes the state of the component
    * @method revertForgotPassword
    * @memberof LandingPage
    * @return {void}
   */
  revertForgotPassword() {
    this.setState({
      forgot: false
    });
  }

  /**
    * changes state of the component
    * @method forgotPassword
    * @memberof LandingPage
    * @return {void}
   */
  forgotPassword() {
    this.setState({
      forgot: true
    });
  }

  /**
   * @returns {Object} component
   * @memberof LandingPage
  * @memberof LandingPage
  */
  render() {
    if (this.state.forgot) {
      return (
        <ForgotPassword revertForgotPassword={this.revertForgotPassword} />
      );
    }
    return (
      <div className="page-wrapper">
        <div className="card main-card">
          <div className="card-tabs">
            <ul className="tabs tabs-fixed-width">
              <li className="tab"><a href="#signup-form" className="active">Sign Up</a></li>
              <li className="tab"><a href="#signin-form">Sign In</a></li>
            </ul>
          </div>
          <div className="card-content">
            <div id="signup-form" className="active">
              <SignUpForm />
            </div>
            <div id="signin-form">
              <SignInForm forgotPassword={this.forgotPassword} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
