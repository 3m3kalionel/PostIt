import React, { Component } from 'react';

import Header from '../common/Header';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

class LandingPage extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    return (

        <div className="page-wrapper">
          <div className="card main-card">
            <div className="card-tabs">
              <ul className="tabs tabs-fixed-width">
                <li className="tab"><a href="#signup-form">Sign Up</a></li>
                <li className="tab"><a href="#signin-form">Sign In</a></li>
              </ul>
            </div>
            <div className="card-content">
              <div id="signup-form">
                <SignUpForm />
              </div>
              <div id="signin-form">
                <SignInForm />
              </div>
            </div>
          </div>
        </div>
       
    );
  }
}

export default LandingPage;
