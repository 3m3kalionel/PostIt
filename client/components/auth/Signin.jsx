// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { signIn } from '../../actions/actionCreators';

// class Signin extends Component {
//   constructor() {
//     super();
//     this.state = {
//       userName: '',
//       password: ''
//     }
//     this.signIn = this.signIn.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//   }

//   signIn(event) {
//     event.preventDefault();
//     this.props.signIn(this.state);
//   }

//   handleInputChange(event) {
//     event.preventDefault();
//     this.setState({ [event.target.id]: event.target.value });
//   }


//   render() {
//     return (
//       <div id="sign-in" className="modal">
//         <div className="modal-content">
//           <div className="row">
//             <form className="col s12" onSubmit={this.signIn}>
//               <div className="row">
//                 <div className="input-field col s12">
//                   <input onChange={this.handleInputChange} id="username" type="text" className="validate" />
//                   <label htmlFor="username">Username</label>
//                 </div>
//                 <div className="input-field col s12">
//                   <input onChange={this.handleInputChange} id="password" type="password" className="validate" />
//                   <label htmlFor="password">Password</label>
//                 </div>
//                 <button className="btn waves-effect waves-light right" type="submit" name="action">Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="modal-footer">
//           <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(null, { signIn })(Signin);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { signin } from '../../actions/actionCreators';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  handleInputChange(event) {
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    // this.props.signinRequest(this.state);
    this.props.signin(this.state).then(() => {
      this.props.history.push('/dashboard')
    });
  }

  render() {
    return (
      <div id="sign-in" className="modal">
        <div className="modal-content">
          <h4 className="header2">Sign in to continue...</h4>
          <div className="row">
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input onChange={this.handleInputChange} id="username" type="text" className="validate" value={this.state.username}/>
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s12">
                  <input onChange={this.handleInputChange} id="password" type="password" className="validate" value={this.state.password} />
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

// const mapDispatchToProps = (dispatch)  => {
//   return {
//     signinRequest: userDetails => dispatch(signin(userDetails))
//   }
// }
export default withRouter(connect(null, { signin })(Signin));
