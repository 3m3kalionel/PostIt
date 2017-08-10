// import React, { Component } from 'react';
// import axios from 'axios';

// class SignupContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {}
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange = (e) => {
//     const field = e.target.name;
//     const user = this.state.user;
//     user[field] = e.target.value;
//     this.setState({ user });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const { user } = this.state;
//     console.log("state", user);
//     try {
//       axios.post('/api/user/signup', user).then((response) => {
//         console.log('ded', response);
//         if(response) {
//           // console.log('err', err);
//         }
//       });
//     } catch(err){
//       console.log("err", err);
//     }
//   }

//   render() {
//     return (
//         <div
//           id="signup"
//           className="modal"
//         >
//           <div
//             className="modal-content"
//           >
//             <div
//               className="col s12 m12 l6"
//             >
//               <h4 className="header2">Sign up for PostIt!®</h4>
//               <div
//                 className="row"
//               >
//                   <div className="row col s12">
//                     <div className="input-field col s12">
//                       <i className="material-icons prefix">person_outline</i>
//                       <input
//                         id="userName"
//                         type="text"
//                         className="validate"
//                         name="username"
//                         onChange={this.handleChange}
//                         value={this.state.user.userName}
//                       />
//                       <label htmlFor="username">Username</label>
//                     </div>
//                     <div className="input-field col s12">
//                       <i className="material-icons prefix">mail_outline</i>
//                       <input
//                         id="email"
//                         type="email"
//                         name="email"
//                         className="validate"
//                         onChange={this.handleChange}
//                         value={this.state.user.email}
//                       />
//                       <label htmlFor="email" data-error="wrong email format" data-success="right">Email</label>
//                     </div>
//                     <div className="input-field col s12">
//                       <i className="material-icons prefix">lock_outline</i>
//                       <input
//                         id="password"
//                         type="password"
//                         className="validate"
//                         name="password"
//                         onChange={this.handleChange}
//                         value={this.state.user.password}
//                       />
//                     </div>
//                     <div className="input-field col s12">
//                       <i className="material-icons prefix">phone_outline</i>
//                       <input id="icon_telephone" type="number" className="validate" />
//                       <label htmlFor="icon_telephone">Telephone</label>
//                     </div>
//                     <button className="btn waves-effect waves-light right" onClick={this.handleSubmit}>Submit</button>
//                   </div>
//               </div>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
//           </div>
//         s</div>
//     )
//   }
// }

// export default SignupContainer;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, mSignUp } from '../../actions/actionCreators';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: ""
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
    mSignUp(this.state, this.props.dispatch).then((response) => {
      // console.log('*********^^^^^^', this.props)
    });

    // this.props.signupRequest(this.state).then(() => {
    //   console.log('=====in component success====', this.props.signupResponseData.userReducer.success)
    //   console.log('=====in component error====', this.props.signupResponseData.userReducer.error)
    // })
  }

  render() {
    return (
      <div
        id="signup" className="modal"
        >
        <div
          className="modal-content"
          >
          <div
            className="col s12 m12 l6"
            >
            <h4
              className="header2">Sign up for PostIt!®</h4>
            <div 
              className="row">
              <form className="col s12" onSubmit={this.onSubmit}>
                <div className="row">

                  <div className="input-field col s12">
                    <i className="material-icons prefix">person_outline</i>
                    <input id="username" type="text" className="validate" value={this.state.username} onChange={this.handleInputChange} />
                    <label htmlFor="username">Username</label>
                  </div>

                  <div className="input-field col s12">
                    <i className="material-icons prefix">mail_outline</i>
                    <input  id="email" type="email" className="validate" value={this.state.email} onChange={this.handleInputChange}/>
                    <label htmlFor="email" data-error="wrong email format" >Email</label>
                  </div>

                  <div className="input-field col s12">
                    <i className="material-icons prefix">lock_outline</i>
                    <input id="password" type="password" className="validate" value={this.state.password} onChange={this.handleInputChange} />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="input-field col s12">
                    <i className="material-icons prefix">lock_outline</i>
                    <input id="confirmPassword" type="password" className="validate" value={this.state.confirmPassword} onChange={this.handleInputChange} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>

                  <div className="input-field col s12">
                    <i className="material-icons prefix">phone_outline</i>
                    <input id="phoneNumber" type="number" className="validate" value={this.state.phoneNumber} onChange={this.handleInputChange} />
                    <label htmlFor="phoneNumber">Telephone</label>
                  </div>

                  <button className="btn waves-effect waves-light right" type="submit" name="action">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signupRequest: userDetails => dispatch(signup(userDetails))
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     signupResponseData: state.userReducer
//   }
// }

export default connect(null)(Signup);
// export default connect(mapStateToProps, mapDispatchToProps)(Signup);
