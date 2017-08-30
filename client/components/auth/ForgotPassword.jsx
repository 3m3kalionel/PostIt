import React, { Component } from 'react';
import { connect } from 'react-redux';

import { verifyUser } from '../../actions/userActions';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.verifyUser(this.state);
  }

  render() {
    return (
      <div className="reset-container0">
        <form onSubmit={this.onSubmit}>
          <h4>forgot password</h4>
          <div className="input-field col-s6">
            <input id="email" type="email" className="validate" onChange={this.handleInputChange} data-error="wrong email format" placeholder="enter your email" value={this.state.email} required />
          </div>
          <div id="button-div">
            <button className="btn" type="submit">Submit</button>
          </div>
          <div id="button-div" onClick={() => this.props.revertForgotPassword()}>
            <button className="btn" type="submit">cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  verifyUser: email => dispatch(verifyUser(email))
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
