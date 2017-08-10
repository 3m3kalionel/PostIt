// import React, { Component} from 'react';
// import Signup from '../auth/Signup.jsx';
// import Signin from '../auth/Signin.jsx';
// import { connect } from 'react-redux';


// class NewNav extends Component {

//   renderNav() {
//     return(
//       <div>
//         <nav>
//           <div className="container">
//             <a href="#!" className="brand-logo left col s3 m9">PostIt!</a>
//                 <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
//             <a href="#!" className="brand-logo col s3 m9">PostIt!</a>
//             {
//             this.props.token ? 
//               <ul className="right col s5 offset-s4 m3">
//                 <li><a className="large material-icons">notifications</a></li>                        
//                 <li><a href="#!" className="material-icons large">exit_to_app</a></li>
//               </ul>
//             :
//               <ul className="right col s5 offset-s4 m3">
//                 <li><a href="#sign-in" className="modal-trigger">Sign in</a></li>
//                 <li><a href="#signup" className="modal-trigger">Sign up</a></li>
//               </ul>
//             }
//           </div>
//         </nav>
//         <div className="central-position">
//           <a href="#sign-in" className="waves-effect modal-trigger item">Sign In</a>
//           <a href="#signup" className="waves-effect waves-light modal-trigger item">Signup</a>       
//         </div>
//       </div>
//     )
//   }

//   renderSignin() {
//     return (
//       <Signin />
//     );
//   }

//   renderSignup() {
//     return (
//       <Signup />
//     );
//   }
//   render() {
//     return (
//       <div>
//         {this.renderNav()}
//         {this.renderSignup()}
//         {this.renderSignin()}
//       </div>

//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     token: state.user.token
//   };
// }

// export default connect(mapStateToProps)(NewNav);


import React, { Component} from 'react';
import Signup from '../auth/Signup.jsx';
import Signin from '../auth/Signin.jsx';

class NewNav extends Component {

  renderNav() {
    return(
      <div>
        <nav>
          <div className="container">
            <a href="#!" className="brand-logo left col s3 m9">PostIt!</a>
                <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
            <a href="#!" className="brand-logo col s3 m9">PostIt!</a>
            {
            this.props.token ? 
              <ul className="right col s5 offset-s4 m3">
                <li><a className="large material-icons">notifications</a></li>                        
                <li><a href="#!" className="material-icons large">exit_to_app</a></li>
              </ul>
            :
              <ul className="right col s5 offset-s4 m3">
                <li><a href="#sign-in" className="modal-trigger">Sign in</a></li>
                <li><a href="#signup" className="modal-trigger">Sign up</a></li>
              </ul>
            }
          </div>
        </nav>
        <div className="central-position">
          <a href="#sign-in" className="waves-effect modal-trigger item">Sign In</a>
          <a href="#signup" className="waves-effect waves-light modal-trigger item">Signup</a>       
        </div>
      </div>
    )
  }

  renderSignin() {
    return (
      <Signin />
    );
  }

  renderSignup() {
    return (
      <Signup />
    );
  }
  render() {
    return (
      <div>
        {this.renderNav()}
        {this.renderSignup()}
        {this.renderSignin()}
      </div>

    )
  }
}

export default NewNav;