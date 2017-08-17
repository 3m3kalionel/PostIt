import React, { Component } from 'react';

class AddUserButton extends Component {
  render () {
    return (
      <div>
        <li><a href="#user-to-group" className="btn-floating rgb(243, 243, 243, 1) modal-trigger"><i className="large material-icons">person_add</i></a></li>
      </div>
    );
  }
}



export default AddUserButton;