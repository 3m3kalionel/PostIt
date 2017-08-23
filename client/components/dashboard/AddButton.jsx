import React, { Component } from 'react';

// import CreateGroupModal from './CreateGroupModal.jsx';
// import AddUserModal from './AddUserModal.jsx';
import AddUserButton from './AddUserButton.jsx';
import CreateGroupButton from './CreateGroupButton.jsx';

class AddButton extends Component {
  renderButton () {
    return (
      <div className="fixed-action-btn add-btn">
          <a href="#" className="btn-floating rgb(243, 243, 243, 1)"><i className="large material-icons">add</i></a>
          <ul>
            <AddUserButton />
            <CreateGroupButton />
          </ul>
      </div>
    );
  }

  // renderUser () {
  //   return (
  //     <AddUserModal />
  //   )
  // }

  // renderGroup () {
  //   return (
  //     <CreateGroupModal />
  //   )
  // }

  render () {
    return (
      <div>
        {this.renderButton()}
        {/*{this.renderUser()}
        {this.renderGroup()}*/}
      </div>
    );
  }
}

export default AddButton;

// class AddButton extends Component {
//   renderButton () {
//     return (
//       <div className="fixed-action-btn add-btn">
//           <a href="#" className="btn-floating red"><i className="large material-icons">add</i></a>
//           <ul>
//             <li><a href="#user-to-group" className="btn-floating green modal-trigger"><i className="large material-icons">person_add</i></a></li>
//             <li><a href="#new-group" className="btn-floating yellow modal-trigger"><i className="large material-icons">group_add</i></a></li>
//           </ul>
//       </div>
//     );
//   }

//   renderUser () {
//     return (
//       <AddUserModal />
//     )
//   }

//   renderGroup () {
//     return (
//       <AddGroupModal />
//     )
//   }

//   render () {
//     return (
//       <div>
//         {this.renderButton()}
//         {this.renderUser()}
//         {this.renderGroup()}
//       </div>
//     );
//   }
// }

// export default AddButton;