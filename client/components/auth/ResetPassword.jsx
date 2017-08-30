import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/userActions';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verificationcode: '',
      newpassword: '',
      retypenewpassword: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    console.log('here', event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const resetDetails = {
      verificationcode: this.state.verificationcode,
      newpassword: this.state.newpassword
    };
    this.props.resetPassword(resetDetails)
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className="reset-container0">
        <form onSubmit={this.onSubmit}>
          <h4>Reset password</h4>
          <div className="input-field col-s6">
            <input id="verificationcode" type="text" placeholder="enter verification code" name="verificationcode" onChange={this.handleInputChange} required />
          </div>

          <div className="input-field col-s6">
            <input id="newpassword" type="password" placeholder="enter new password" name="newpassword" required />
          </div>

          <div className="input-field col-s6">
            <input id="retypenewpassword" type="password" placeholder="retype your password" name="retypenewpassword" required />
          </div>

          <div id="button-div">
            <button className="btn" type="submit">reset</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetPassword: resetDetails => dispatch(resetPassword(resetDetails))
});


export default connect(null, mapDispatchToProps)(ResetPassword);
// https://codepen.io/sdthornton/pen/wBZdXq search for the cubic-bezier part
