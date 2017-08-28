import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import { signUp } from '../../actions/userActions';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",      
      password: "",
      phone: "",
      passwordConfirm: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.signUp(this.state)
      .then(() => {
        browserHistory.push('/dashboard')
      });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id] : event.target.value 
    });
  } 

  render() {
    return (
      <form className="auth-form" onSubmit={this.onSubmit}>
        <h3>Welcome</h3>
        <div className="input-field">
          <input onChange={this.handleInputChange} id="username" type="text" className="validate" required />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field">
          <input onChange={this.handleInputChange} id="email" type="email" className="validate" required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field">
          <input onChange={this.handleInputChange} id="password" type="password" className="validate" required />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-field">
          <input onChange={this.handleInputChange} id="passwordConfirm" type="password" className="validate" required />
          <label htmlFor="password-confirm">Confirm Password</label>
        </div>
        <div className="input-field">
          <input onChange={this.handleInputChange} id="phone" type="number" className="validate" required />
          <label htmlFor="phone">Phone Number</label>
        </div>
        <div id="button-div">
          <button className="btn" type="submit">Submit</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
