import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import { signIn } from '../../actions/userActions';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id] : event.target.value,
    })
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.signIn(this.state)
    .then(() => {
      browserHistory.push('/dashboard')
    });
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.onSubmit}>
        <h3>Welcome</h3>
        <div className="input-field">
          <input onChange={this.handleInputChange} id="username" type="text" className="validate" required/>
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field">
          <input onChange={this.handleInputChange} id="password" type="password" className="validate" required/>
          <label htmlFor="password">Password</label>
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
  signIn: userData => dispatch(signIn(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
