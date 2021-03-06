import React, { Component } from 'react';

import SignUpFormPage from './SignUpForm';
import SignInFormPage from './SignInForm';
import ForgotPasswordPage from './ForgotPassword';

/**
 * React component that displays the landing page
 * @class LandingPage
 * @extends {Component}
 */
class LandingPage extends Component {
  /**
   * Creates an instance of LandingPage.
   * @param {object} props 
   * @memberof LandingPage
   */
  constructor(props) {
    super(props);
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
   * @returns {undefined}
   */
  componentDidMount() {
    $('ul.tabs').tabs();
  }

  /**
   * makes jquery function available on component update
   * @method componentDidUpdate
   * @memberof LandingPage
   * @returns {undefined}
   */
  componentDidUpdate() {
    $('ul.tabs').tabs();
  }

  /**
   * updates the state to render 
    * @method revertForgotPassword
    * @memberof LandingPage
    * @returns {undefined}
   */
  revertForgotPassword() {
    this.setState({
      forgot: false
    });
  }

  /**
    * changes state of the component to render signup/login page
    * @method forgotPassword
    * @memberof LandingPage
    * @returns {undefined}
   */
  forgotPassword() {
    this.setState({
      forgot: true
    });
  }

  /**
   * @returns {object} component
   * @memberof LandingPage
  */
  render() {
    return this.state.forgot ?
      (
        <div className="forgot-password">
          <ForgotPasswordPage
            revertForgotPassword={this.revertForgotPassword}
          />
        </div>
      )
      :
      (
        <div className="page-wrapper">
          <div className="card main-card">
            <div className="card-tabs">
              <ul className="tabs tabs-fixed-width">
                <li
                  className="tab"
                ><a href="#signup-form" className="active">Sign Up</a></li>
                <li className="tab"><a href="#signin-form">Sign In</a></li>
              </ul>
            </div>
            <div className="card-content">
              <div id="signup-form" className="active">
                <SignUpFormPage />
              </div>
              <div id="signin-form">
                <SignInFormPage
                  forgotPassword={this.forgotPassword}
                />
              </div>
            </div>
          </div>
        </div>
      );
  }
}
export default LandingPage;
