import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/actionCreators';

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: ''
    }
    this.signIn = this.signIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  signIn(event) {
    event.preventDefault();
    this.props.signIn(this.state);
  }

  handleInputChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }


  render() {
    return (
      <div id="sign-in" className="modal">
        <div className="modal-content">
          <div className="row">
            <form className="col s12" onSubmit={this.signIn}>
              <div className="row">
                <div className="input-field col s12">
                  <input onChange={this.handleInputChange} id="username" type="text" className="validate" />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s12">
                  <input onChange={this.handleInputChange} id="password" type="password" className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
                <button className="btn waves-effect waves-light right" type="submit" name="action">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}

export default connect(null, { signIn })(Signin);