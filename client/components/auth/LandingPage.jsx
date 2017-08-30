import React, { Component } from 'react';

import Header from '../common/Header';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import ForgotPassword from './ForgotPassword';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      forgot: false,
    };
    this.forgotPassword = this.forgotPassword.bind(this);
    this.revertForgotPassword = this.revertForgotPassword.bind(this);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
  }

  revertForgotPassword() {
    this.setState({
      forgot: false
    });
  }

  forgotPassword() {
    this.setState({
      forgot: true
    });
  }

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
