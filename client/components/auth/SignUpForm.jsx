import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Proptypes from 'prop-types';

import { signUp } from '../../actions/userActions';

/**
 * React component that displays the sign up form
 * @class ForgotPassword
 * @extends {Component}
 */
class SignUpForm extends Component {
  /**
   * Creates an instance of SignUpForm
   * @param {Object} props 
   * @memberof SignUpForm
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      phone: '',
      passwordConfirm: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
  * triggers an action that registers a new user
  * @method onSubmit
  * @param {object} event
  * @memberof SignUpForm
  * @return {undefined}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.signUp(this.state)
      .then(() => {
        browserHistory.push('/dashboard');
      });
  }

  /**
  * updates state as user's input changes
  * @method handleInputChange
  * @param {object} event
  * @memberof SignUpForm
  * @return {undefined}
  */
  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /**
   * @returns {object} component
   * @memberof SignUpForm
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
            id="email"
            type="email"
            className="validate"
            required
          />
          <label htmlFor="email">Email</label>
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
        <div className="input-field">
          <input
            onChange={this.handleInputChange}
            id="passwordConfirm"
            type="password"
            className="validate"
            required
          />
          <label htmlFor="password-confirm">Confirm Password</label>
        </div>
        <div className="input-field">
          <input
            onChange={this.handleInputChange}
            id="phone"
            type="number"
            className="validate"
            required
          />
          <label htmlFor="phone">Phone Number</label>
        </div>
        <div id="button-div">
          <button className="btn" type="submit">Sign up</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  error: state.errors.error
});

const mapDispatchToProps = dispatch => ({
  signUp: userData => dispatch(signUp(userData))
});

SignUpForm.propTypes = {
  signUp: Proptypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
