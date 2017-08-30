import React, { Component } from 'react';

import AddUserButton from './AddUserButton.jsx';
import CreateGroupButton from './CreateGroupButton.jsx';

// class AddButton extends Component {
//   renderButton () {
//     return (
//       <div className="fixed-action-btn add-btn">
//         <a href="#" className="btn-floating rgb(243, 243, 243, 1)"><i className="large material-icons">add</i></a>
//         <ul>
//           <AddUserButton />
//           <CreateGroupButton />
//         </ul>
//       </div>
//     );
//   }

//   render () {
//     return (
//       <div>
//         {this.renderButton()}
//       </div>
//     );
//   }
// }

// export default AddButton;


const AddButton = () =>
  (
    <div className="fixed-action-btn add-btn">
      <a
        href="#!"
        className="btn-floating rgb(243, 243, 243, 1)"
      ><i className="large material-icons">add</i></a>
      <ul>
        <AddUserButton />
        <CreateGroupButton />
      </ul>
    </div>
  );

export default AddButton;

